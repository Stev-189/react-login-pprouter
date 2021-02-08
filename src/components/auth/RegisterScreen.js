import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import validator from 'validator'
import { startRegisterWithEmailPasswordName } from '../../actions/auth'
import { removeError, setError } from '../../actions/ui'

import { useForm } from '../hooks/useForm'

export const RegisterScreen = () => {

  const dispatch = useDispatch()//uso distpatch creamos le reducer ui y las funciones ui.js, uiReducer.js
  //01- llamamos las funciones ui
  //02- hacem,os e llamam de ui reducer al store.js,
  //03- llamamos al dispatch 
  //04-y agregamos le dispatch con la funcion a ejecutar
  
  // const state= useSelector(state=>state)// regresa el valor del statre en este caso esta auth u ui
  const {msgError}= useSelector(state=>state.ui)// por desestructuracion podmeos obtener le msgErrro si existe
  //USO useForm
  //01-uso de user form primero valor inicial, simpre se debe llamar dentro d euna funcion, debe tener el mismomnombre dle input
  const [formValues, handleInputChange ]= useForm({
    name: 'Nori',
    email:'nando@gmail.com',
    password:'123456',
    password2: '123456'
  })

  //02- recuperamos loa valores
  const {name, email, password, password2}=formValues;
  // console.log(formValues);
  
  const isFormValid=e=>{
    // let result= true
    // for (const prop in e){
    //   result = (e[prop].trim().length===0)? false: result;
    // }
    // return result
    return (name.trim().length===0)
            ?(dispatch(setError('Name is required')),false)
            :(!validator.isEmail(email))
            ?(dispatch(setError('Email is invalid')),false)
            :(password!==password2 || password.length<5)
            ?(dispatch(setError('Password should be at least 6 characters and match each other')),false)
            : (dispatch(removeError()),true);
            
  }
  
  //03-ejecutamos submit
  const handleRegister=e=>{
    e.preventDefault();
    // (isFormValid(formValues)) && console.log('Formulario correcto');
    (isFormValid(formValues)) && dispatch(startRegisterWithEmailPasswordName(email, password, name));
  }

  return (
    <>
      <h3 className='auth__title'>Register</h3>    
      <form onSubmit={handleRegister/*//04- asignasmo submit */}
        className='animate__animated animate__fadeIn animate__faster'
      >
        {/* <div className='auth__alert-error'>
          hola mundo
        </div> */}
        {// si existe le mensaje de error lo meustra en rojo
          msgError&&(<div className='auth__alert-error'>{msgError}</div>)
        }
        <input
          type='text'
          placeholder='Name'
          name='name' 
          className= 'auth__input'
          autoComplete='off'
          //05- a cada input le asignamos el value, y la funcion de cambio debe tener le mismo nombre d le aname inpout y lka variable
          value={name}
          onChange={handleInputChange}
        />
        <input
          type='text'
          placeholder='Email'
          name='email' 
          className= 'auth__input'
          autoComplete='off'
          //05- a cada input le asignamos el value, y la funcion de cambio debe tener le mismo nombre d le aname inpout y lka variable
          value={email}
          onChange={handleInputChange}
        />
        <input
          type='password'
          placeholder='Password'
          name='password' 
          className= 'auth__input'
          //05- a cada input le asignamos el value, y la funcion de cambio debe tener le mismo nombre d le aname inpout y lka variable
          value={password}
          onChange={handleInputChange}
        />
        <input
          type='password'
          placeholder='Confirm password'
          name='password2' 
          className= 'auth__input'
          //05- a cada input le asignamos el value, y la funcion de cambio debe tener le mismo nombre d le aname inpout y lka variable
          value={password2}
          onChange={handleInputChange}
        />
        <button
          type='submit'
          className='btn btn-primary btn-block mb-5'
        >Register</button>

        
        <Link 
          to='/auth/login'
          className='link'
        >
          Already registered?
        </Link>
      </form>
    </>
  )
}
