import React from 'react'

export const JournalEntry = () => {
  return (
    <div className='journal__entry pointer'>
      <div 
        className='journal__entry-picture'
        style={{
          backgroundSize:'cover',
          backgroundImage:'url(https://i.blogs.es/5efe2c/cap_001/450_1000.jpg)'
        }}// asi se delcaran propiedades scss en REACT
      ></div>
      <div className='journal__entry-body'>
        <p className='journal__entry-title'> un nuevo dia</p>
        <p className='journal__entry-content'>Reprehenderit id in duis consectetur deserunt veniam fugiat.</p>
      </div>
      <div className="journal__entry-date-box">
        <span>Monday</span>
        <h4>28</h4>
      </div>
      
    </div>
  )
}
