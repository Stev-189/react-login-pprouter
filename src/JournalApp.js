import React from 'react'
import { Provider } from 'react-redux';// es como usar el use context pero le enviamos el sotare de funciones
import { store } from './store/store';
import { AppRouter } from './routers/AppRouter';

export const JournalApp = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  )
};
