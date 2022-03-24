import React, {Component} from 'react';
import ReactDOM, { render } from 'react-dom';
import { connect } from 'react-redux';
import {Link, Navigate} from 'react-router-dom';
import * as actions from './actions/actions';
import EditCards from './components/EditCards.jsx';
// import '../styles/CurrentWeather.css';


//make onCLick functions and prop drill down to buttons

const mapStateToProps = state => {
  //insert user id from state
  //insert reminders from state
  return {
    userId: state.main.userId,
    reminders: [...state.main.reminders]
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchDeleteReminder: (reminderId) => {
    dispatch(actions.deleteReminder(reminderId));
  },
  dispatchAddReminder: ({}) => {
    dispatch(actions.addReminder({}));
  },
  
  // dispatchUpdateReminder: (reminderId) => {
  //   dispatch(actions.updateReminder(reminderId));
  // }
});

//insert functions for opening modals

const EditReminders = (props) => {
  console.log(`props: ${props}`)
  // const deleteReminder = (event) => {
  //   //update to include fetch request
  //   props.dispatchDeleteReminder(reminderId);
  // }
  // const addReminder = (event) => {
  //   props.dispatchAddReminder(reminderObj)
  // }
  const cardsArr = [];
  for (let i = 0; i < props.reminders.length; i += 1) {
    cardsArr.push(
    <EditCards deleteReminder={dispatchDeleteReminder} message={props.reminders[i].message}/>
  )}
  return (
    <div>
      <nav>
      <Link to={'/dashboard'}>
        <button>
          Back to dashboard
        </button>
      </Link>
    </nav>
    {cardsArr}

    </div>
  )
}

// export default connect(mapStateToProps, mapDispatchToProps)(EditReminders);
export default EditReminders;