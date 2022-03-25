import React from 'react';
// import '../styles/CurrentWeather.css';

const EditCards = props => {

  return (
  <div>
    <div className='edit-card'>
      <ul className='card-details'>
        <li className='card-details'>When {props.reminder.variable} </li>
        <li className='card-details'>is {props.reminder.condition} </li>
        <li className='card-details'>{props.reminder.value} </li>
        <li className='card-details'>{props.reminder.message} </li>
      </ul>
      <button className='edit-button' 
        onClick={(e) => { 
          e.preventDefault();
          props.updateReminder(props.rec_id);
          }}>Edit</button>
      <button className='delete-button'
        onClick={(e) => { 
          e.preventDefault();
          props.deleteReminder(props.rec_id);
          }}>Delete</button>
    </div>
  </div>
  )
}

export default EditCards;
