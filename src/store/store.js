// import { createStore } from "redux";// importamos para crear el stotage
// import { combineReducers } from "redux";// importamos para unir varios reducer
// import { applyMiddleware } from "redux";// obiamente para aplicar middleware
// import { compose } from "redux";// obiamente para aplicar middleware y devtools
import { createStore, combineReducers, applyMiddleware, compose } from "redux";// importamos para crear el stotage

import thunk from 'redux-thunk';// para facilitar middelware
import { authReducer } from "../reducers/authReducer";
import { notesReducer } from "../reducers/notesReducer";
import { uiReducer } from "../reducers/uiReducer";


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
//para applicar devtool junto con el meddletware

//primero creamos la combinacion de reducer para el stpore ya que solo se le puede pasar 1 reducer
const reducers= combineReducers({
  auth: authReducer,
  ui: uiReducer,
  notes: notesReducer
})

export const store= createStore(
  reducers,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) // solo se l epuede pasar 1 reducer a createStore
  // todo esto s elo mandamos a la parte mas alata del sofware

  //para usar middleware usamos este y no le anterior
  composeEnhancers(
    applyMiddleware(thunk)//para trabar acciones async
  )
) // solo se l epuede pasar 1 reducer a createStore