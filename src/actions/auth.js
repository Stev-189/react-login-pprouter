import { firebase, googleAuthProvider } from "../firebase/firebaseConfig"
import { types } from "../types/types"
import { finishLoading, startLoading } from "./ui"
import Swal from 'sweetalert2'

export const starLoginEmailPassword = (email, password)=>{
  return(dispatch)=>{//como es asincrona retornamos al dispath del resultado
    dispatch(startLoading());
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(({user})=>{
      dispatch(login(user.uid, user.displayName))
      dispatch(finishLoading())
    }).catch(e=>{
      // console.log(e)
      dispatch(finishLoading());
      Swal.fire('Error', e.message, 'error')}
      );
  }
}

export const startRegisterWithEmailPasswordName=(email, password, name)=>{
  return(dispatch)=>{//como es asincrona retornamos al dispath del resultado
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(async ({user})=>{
        await user.updateProfile({displayName: name})// para garegar name a la sporpiedades de vista d ename
        dispatch(
          login(user.uid, user.displayName)
        )
      })
      .catch(e=>Swal.fire('Error', e.message, 'error'));
  }
}

//autenticacion de google
export const startGoogleLogin =()=>{
  return(dispatch)=>{//como es asincrona retornamos al dispath del resultado
    firebase.auth().signInWithPopup(googleAuthProvider)
      // .then(userCard=>{
      //   console.log(userCard);
      .then(({user})=>{
        dispatch(
          login(user.uid, user.displayName)
        )
      })
  }
}

export const login=(uid,displayName)=>({type: types.login, payload: { uid, displayName} })

export const startLogOut=()=>{
  return async (dispatch)=>{
    await firebase.auth().signOut();// retorna una promesa por eso debe ser asincrono
    dispatch(logout());
  }
}

export const logout =()=>({
  type: types.logout
})