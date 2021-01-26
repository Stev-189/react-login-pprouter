import React from 'react'
import { NoteAppBar } from './NoteAppBar'

export const NoteScreen = () => {
  return (
    <div className='notes__main-content'>
      <NoteAppBar/>
      <div className='notes__content'>
        <input
          type='text'
          placeholder='Some awesome title'
          className= 'notes__title-input'
          autoComplete='off'
        />
        <textarea
          placeholder='What happened today'
          className='notes__textarea'
        ></textarea>
        <div className='notes__image'>
          <img
            src='https://dam.smashmexico.com.mx/wp-content/uploads/2018/05/02203221/trend-megaman-lanzamiento-cartuchos-retro-nintendo-nes-snes-cover-770x433.jpg'
            alt='imagen'
          />
        </div>
      </div>
    </div>
  )
}
