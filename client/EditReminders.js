import React, { useEffect } from 'react';
import ReactDOM, { render } from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from './actions/actions';
import EditCards from './components/EditCards.jsx';
// import '../styles/CurrentWeather.css';


//make onCLick functions and prop drill down to buttons

const mapStateToProps = state => {
  return {
    userId: state.main.userId,
    nickname: state.main.nickname,
    city: state.main.city, 
    stateName: state.main.stateName, 
    country: state.main.country,
    currentTemp: state.main.currentTemp, 
    currentAQI: state.main.currentAQI, 
    currentWindSpeed: state.main.currentWindSpeed,
    reminders: [...state.main.reminders],
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchDeleteReminder: (reminderId) => {
    dispatch(actions.deleteReminder(reminderId));
  },
  dispatchAddReminder: (reminderData) => {
    dispatch(actions.addReminder(reminderData));
  },
  dispatchUpdateReminders: (reminders) => { // update the reminders array in state
    dispatch(actions.updateReminders(reminders));
  },
  dispatchEditReminder: (reminderData) => { // edit each reminder objects
    dispatch(actions.editReminder(reminderData));
  }
});


// insert functions for opening modals

const port = 3000;
const url = `http://localhost:${port}/reminder`;


const EditReminders = (props) => {
  // console.log(`props: ${props}`)
  // console.log(`props.reminders: ${props.reminders}`)
  // console.log(`props.reminders[0].variable: ${props.reminders[0].variable}`)

  useEffect(() => {
    function updateReminders(userId) { 
      fetch(url)
      .then(data => data.json())
      .then(reminders => {
        let arr = [];
        if (!Array.isArray(reminders)) {
          return props.dispatchUpdateReminders([]);
        }
        reminders.forEach(el => { arr.push(el) })
        return props.dispatchUpdateReminders(arr);
      })
      .catch(err => console.log('useEffect.updateReminders has error ', err))

    }

    updateReminders(props.userId);

}, []);


  const cardsArr = [];
  for (let i = 0; i < props.reminders.length; i += 1) {
    cardsArr.push(
    <EditCards 
      key={i}
      deleteReminder={props.dispatchDeleteReminder} 
      updateReminder={props.dispatchUpdateReminder}
      reminder={props.reminders[i]}
      // rec_id={props.reminders[i].rec_id}
      // variable={props.reminders[i].variable}
      // condition={props.reminders[i].condition}
      // value={props.reminders[i].value}
      // message={props.reminders[i].message}
      />
  )}
  return (
    <div>
      <nav>
      <Link to={'/dashboard'}>
        <button>
          Back to Dashboard
        </button>
      </Link>
    </nav>
    {cardsArr}
    <div>
      <button>
        Add new Reminder
      </button>
    </div>

    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(EditReminders);
