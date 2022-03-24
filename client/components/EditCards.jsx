import React from 'react';
// import '../styles/CurrentWeather.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


//invoke the drilled functions on button clicks

const EditCards = props => {

  return (
  <div>
    <div className='edit-card'>
      <ul className='card-details'>
        <li className='card-details'>Details: {props.reminderText}</li>
      </ul>
      <button className='edit-button'>Edit</button>
      <button className='delete-button'>Delete</button>
    </div>
  </div>
  )
}

export default EditCards;
