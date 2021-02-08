import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import { login } from '../../actions/auth'
import { useForm } from '../hooks/useForm'
import { starLoginEmailPassword, startGoogleLogin } from '../../actions/auth'
import validator from 'validator'
import { removeError, setError } from '../../actions/ui'

export const LoginScreen = () => {

  const dispatch = useDispatch()// con usando el hooks hace dispatch a login la funcion en cualquier lugar
  const {msgError, loading}= useSelector(state=>state.ui)
  const [formValues, handleInputChange]=useForm({
    email: 'nando@gmail.com',
    password: '123456'
  })
  const {email,password}= formValues


  const isFormValid=e=>{
    return  (!validator.isEmail(email))
            ?(dispatch(setError('Email is invalid')),false)
            :( password.length<5)
            ?(dispatch(setError('Password should be at least 6 characters and match each other')),false)
            : (dispatch(removeError()),true);
            
  }

  const handleLogin=(e)=>{
    e.preventDefault();

    (isFormValid(formValues)) && dispatch( starLoginEmailPassword(email,password) );
  }

  const handleGoogleLogin=()=>{
    dispatch(startGoogleLogin());
  }



  return (
    <>
      <h3 className='auth__title'>Login</h3>
      <form 
        onSubmit={handleLogin}
        className='animate__animated animate__fadeIn animate__faster'
        >
        {// si existe le mensaje de error lo meustra en rojo
          msgError&&(<div className='auth__alert-error'>{msgError}</div>)
        }
        <input
          type='text'
          placeholder='Email'
          name='email' 
          className= 'auth__input'
          autoComplete='off'
          value={email}
          onChange={handleInputChange}
        />
        <input
          type='password'
          placeholder='Password'
          name='password' 
          className= 'auth__input'
          value={password}
          onChange={handleInputChange}
        />
        <button
          disabled={loading}
          type='submit'
          className='btn btn-primary btn-block'
        >Login</button>

        <div className='auth__social-networks'>
          <p>Login with social networks</p>
            <div className="google-btn"
                 onClick={ handleGoogleLogin}
            >
              <div className="google-icon-wrapper">
                <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
              </div>
              <p className="btn-text">
                <b>Sign in with google</b>
              </p>
            </div>
        </div>
        <Link 
          to='/auth/register'
          className='link'
        
        >
          Create new account
        </Link>
      </form>
    </>
  )
}
