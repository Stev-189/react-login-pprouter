import React from 'react'
import moment from 'moment'// npm para trabajar las fechas
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';


export const JournalEntry = ({id, date, title, body, url}) => {
  // console.log(id, date, title, body, url);
  const noteDate= moment(date);
  const dispatch = useDispatch();// para usar dispatch lo lamaoms de redux
  
  // console.log(noteDate);
  const handleEntryClick=()=>{
    dispatch(activeNote(id, {date, title, body, url}))
  }
  return (
    <div 
      className='journal__entry pointer animate__animated animate__fadeIn animate__faster'
      onClick={handleEntryClick}
    >
      {
        url && // si existe url la muestra
        <div 
          className='journal__entry-picture'
          style={{
            backgroundSize:'cover',
            backgroundImage:`url(${url})`
          }}// asi se delcaran propiedades scss en REACT
        ></div>
      }
      <div className='journal__entry-body'>
        <p className='journal__entry-title'>{ title }</p>
        <p className='journal__entry-content'>{ body }</p>
      </div>
      <div className="journal__entry-date-box">
        <span>{noteDate.format('dddd')}</span>
        <h4>{noteDate.format('Do')}</h4>
      </div>
      
    </div>
  )
}
