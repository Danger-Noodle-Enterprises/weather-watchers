import React, {Component} from 'react';
import ReactDOM, { render } from 'react-dom';
import { connect } from 'react-redux';
import {Link, Navigate} from 'react-router-dom';
import * as actions from './actions/actions';
import EditCards from './components/EditCards.jsx';
// import '../styles/CurrentWeather.css';


//make onCLick functions and prop drill down to buttons

const mapStateToProps = state => {
  return {
    userId: state.main.userId,
    reminders: [...state.main.reminders]
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchDeleteReminder: (reminderId) => {
    dispatch(actions.deleteReminder(reminderId));
  },
  dispatchAddReminder: (userData) => {
    dispatch(actions.addReminder(userData));
  },
  dispatchUpdateReminders: (userData) => {
    dispatch(actions.updateReminders(userData));
  },
  dispatchEditReminder: (reminderId) => {
    dispatch(actions.editReminder(reminderId));
  }
});

// need to fetch and update reminders from database

// useEffect(() => {
// // fetch
// // method: 'GET'



// }


// insert functions for opening modals


const EditReminders = (props) => {
  console.log(`props: ${props}`)
  console.log(`props.reminders: ${props.reminders}`)
  console.log(`props.reminders[0].variable: ${props.reminders[0].variable}`)

  const cardsArr = [];
  for (let i = 0; i < props.reminders.length; i += 1) {
    cardsArr.push(
    <EditCards 
      key={i}
      deleteReminder={props.dispatchDeleteReminder} 
      updateReminder={props.dispatchUpdateReminder}
      rec_id={props.reminders[i].rec_id}
      variable={props.reminders[i].variable}
      condition={props.reminders[i].condition}
      value={props.reminders[i].value}
      message={props.reminders[i].message}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditReminders);
