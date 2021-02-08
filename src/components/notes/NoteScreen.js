import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes'
import { useForm } from '../hooks/useForm'
import { NoteAppBar } from './NoteAppBar'

export const NoteScreen = () => {

  const dispatch = useDispatch()

  const {active: note} = useSelector(state => state.notes)// or desestructuracion llamamos el elmento de notes que s ellama active
  //haciendo eso la renombramos a note la nota activa
  // console.log(note);
  const [formValues, handleInputChange, reset ]=useForm(note);// obtenemos los valores form
  const {body, title, id}= formValues;

  //en este caso el use efect no actualisa los vbalores d elos estados de los ingresos de las
  //notas en la pantalla de notas
  //262
  const activeId=useRef(note.id);
  //creamos un espacio d ememoria referente a un elemento que no cambia
  //con. curret extraem,os este valor
  useEffect(()=>{
    if(note.id!==activeId.current){
      //si le valor d le anota es distinto ejecuat le reset que reestablese los valores 
      // de los form pero como le enviamos una  variable los establese el valor a esta variable
      reset(note);
      activeId.current=note.id
      //y final mente una ves restablecidos loa valores en los values,
      //ese espacio no cambiente lo cambiamos por la ota actual
    }
  }, [note,reset])

  //actualiza la nota al escribir solo en redux
  useEffect(() => {
    dispatch(activeNote(formValues.id, {...formValues}))// le pasaoa el id y el resto d elos datos
  }, [formValues,dispatch])

  const handleDelete=()=>{
    dispatch(startDeleting(id));
  }

  return (
    <div className='notes__main-content'>
      <NoteAppBar/>
      <div className='notes__content'>
        <input
          type='text'
          placeholder='Some awesome title'
          className= 'notes__title-input'
          autoComplete='off'
          name='title'
          value={title}
          onChange={handleInputChange}
        />
        <textarea
          placeholder='What happened today'
          className='notes__textarea'
          name='body'
          value={body}
          onChange={handleInputChange}
        ></textarea>

        {
          (note.url)&&
          (<div className='notes__image'>
            <img
              src={note.url}
              alt='imagen'
            />
          </div>)
        }
      </div>
      <button
        className='btn btn-danger'
        onClick={handleDelete}
      >Delete</button>
    </div>
  )
}
