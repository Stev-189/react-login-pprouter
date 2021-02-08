import Swal from "sweetalert2"
import { db } from "../firebase/firebaseConfig"
import { fileUpload } from "../helpers/fileUpload"
import { loadNotes } from "../helpers/loadNotes"
import { types } from "../types/types"

export const startNewNote = () => {
  return async(dispatch, getState)=>{
    //getState extare los datos del state de redux
    const {uid} = getState().auth
    // console.log(uid);
    const newNote={
      title: '',
      body: '',
      date: new Date().getTime()
    }
    const doc= await db.collection(`${uid}/journal/notes`).add(newNote)// retorna una promesa
    dispatch(activeNote(doc.id,newNote))
    dispatch(addNewNote(doc.id,newNote));
    // crea la carga de la note activa uniendo id dela noat en firebase y la nota
  }
}

export const addNewNote=(id, note)=>({
  type: types.notesAddNew,
  payload: {
    id, 
    ...note
  }
})

export const activeNote=( id, note )=>({
  type: types.notesActive,// genera accion tipo nota activa
  payload: {// retorna un objeto con id del ususario y la nota
    id, 
    ...note
  }
});

export const startLoadingNotes=(uid)=>{
  return async(dispatch)=>{
    const notes= await loadNotes(uid)// solicitamos la colleccion de notes
    dispatch(setNotes(notes));
  }
}

export const setNotes=(notes)=>({
  type: types.notesLoad,
  payload: notes
})

export const startSaveNote =( note )=>{
  return async(dispatch, getState)=>{
    //getState extare los datos del state de redux, se usa asi por el midelware thunk

    if(!note.url){delete note.url}//se coloca por que firebase no aceptas update null mejor no lo mandes

    const {uid} = getState().auth;
    const noteToFirestore={...note}
    delete noteToFirestore.id;//como la ide vine 2 veces se elimina 1
    await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
    // dispatch(startLoadingNotes(uid))//forma peresosa ya que recarga todo
    dispatch(refreshNote(note.id, noteToFirestore));
    Swal.fire('Saved', note.title,'success')
  }
}
//react-jornal
export const refreshNote =(id, note)=>({
  type: types.notesUpdated,
  payload:{id,note:{id, ...note}}
})

export const startUploading =(file)=>{
  return async(dispatch, getState)=>{
    const {active: activeNote}= getState().notes;

    //swal de espera de carga de archivo de imagen
    Swal.fire({
      title: 'Uploading...',
      text:'Please wait...',
      // allowOutsideClick: false,
      showConfirmButton: false,
      // onBeforeOpen:()=>{
      willOpen:()=>{
        Swal.showLoading();
      }
    })
    const fileUrl = await fileUpload(file);
    activeNote.url=fileUrl;
    dispatch(startSaveNote(activeNote))
    // console.log(fileUrl);
    Swal.close()
  }
}

export const startDeleting=(id)=>{
  return async(dispatch,getState)=>{
    const uid= getState().auth.uid;
    await db.doc(`${uid}/journal/notes/${id}`).delete();
    dispatch(deleteNote(id))
  }
}

export const deleteNote=(id)=>({
  type: types.notesDelete,
  payload: id
})

export const noteLogout =()=>({
  type: types.notesLogoutCleaning
});