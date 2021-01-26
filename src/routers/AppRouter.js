import React, { useEffect, useState } from 'react'
// import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {BrowserRouter as Router, Switch, Redirect} from "react-router-dom";
import { JournalScreen } from '../components/journal/JournalScreen';
import { useDispatch } from 'react-redux';
import { AuthRouter } from './AuthRouter';
import { firebase } from "../firebase/firebaseConfig"
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {
  const dispatch = useDispatch()

  const [cheking, setCheking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user)=>{
      if(user?.uid){// si user?.uid existe ejecuta
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setCheking(false)
    })
  }, [dispatch, setCheking, setIsLoggedIn])// verifica que usuario este login, y si esta autenticao check ruta

  if(cheking){
    return (
      <h1>Wait...</h1>// cheking de validacion de un id
    )
  }

  return (
    <Router>
      <div>
        <Switch>
          {/* <Route path='/auth' component={AuthRouter}/>{/* publica */}
          {/* <Route exact path='/' component={JournalScreen}/>privada */}
          <PublicRoute path='/auth' component={AuthRouter} isAuthenticated={isLoggedIn}/>
          <PrivateRoute exact path='/' component={JournalScreen} isAuthenticated={isLoggedIn}/>
          <Redirect to='/auth/login'/>
        </Switch>
      </div>
    </Router>
  )
}
