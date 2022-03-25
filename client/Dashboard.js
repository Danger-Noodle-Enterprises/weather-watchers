import React from 'react';
import { connect } from 'react-redux';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import * as actions from './actions/actions';
import './styles/Dashboard.css';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather.jsx';
// import Reminders from './components/Reminders.jsx';
// import RemoveFavButton from './components/RemoveFavButton.jsx';
// import FavWeather from './components/FavWeather.jsx';

const mapStateToProps = state => { 
    //redux state
    console.log('state: ', state)
    return {
    // add pertinent state here
    userId: state.main.userId,
    nickname: state.main.nickname,
    city: state.main.city, 
    stateName: state.main.stateName, 
    country: state.main.country,
    currentTemp: state.main.currentTemp, 
    currentAQI: state.main.currentAQI, 
    currentWindSpeed: state.main.currentWindSpeed,
    reminders: [...state.main.reminders],
    // favorites: [...state.main.favorites]
    }
};

const mapDispatchToProps = dispatch => ({
    // create functions that will dispatch action creators
    dispatchSearchLocation: (newSearchLocation) => {
      dispatch(actions.searchForLocation(newSearchLocation));
    }, 

    dispatchAddReminder: (newReminder) => { // not used in here tho
      dispatch(actions.addReminder(newReminder));
    }


    // dispatchAddFavorite: (location) => {
    //   dispatch(actions.addFavorite(location));
    // }

});
  
//fetch request to back end for reminder and dispatch -> update date to hold info


const Dashboard = (props) => {
  //displayReminder function
    //fetch

  //declare dictionary to refer database string to variables
  const dictionary = {
    'windspeed': props.currentWindSpeed,
    'temperature': props.currentTemp,
    'AQI': props.currentAQI
  }
  
  //declare empty array to store each reminder post processing
  const reminderList = [];

  console.log('props.reminders: ', props.reminders);
  // if (props.reminders[0]) console.log('type of reminder value: ', typeof props.reminders[0].value);
  // console.log('dictionary: ', dictionary);
  //loop through favorites and evaluate the variables and conditions based on current environmental conditions
  //sample input
  //[{1,3, temperature, greater, 80, hot}]
  //[{id, type, condition, value, message}]
  for (let i = 0; i < props.reminders.length; i++){
    const currentRule = props.reminders[i];
    console.log('current reminder: ', currentRule);
    //conditional statement to handle greater than cases
    if(currentRule.condition === 'greater than'){
      console.log('CONDITIONAL TRIGGERED: GREATER THAN');
      if(dictionary[currentRule.variable] > currentRule.value) {
        console.log('INSIDE GREATER THAN: CONDITIONAL PASSED');
        reminderList.push(<p key={`message ${i}`}>Reminder triggered: {currentRule.message}</p>);
      }
    }
    
    //conditional statement to handle less than cases
      else if(currentRule.condition === 'less than'){
        console.log('CONDITIONAL TRIGGERED: LESS THAN');
      if(dictionary[currentRule.variable] < currentRule.value) {
        console.log('INSIDE LESS THAN: CONDITIONAL PASSED');
        reminderList.push(<p key={`message ${i}`}>Reminder triggered: {currentRule.message}</p>);
      }
    }

    //conditional statement to handle equal to cases
    else if(currentRule.condition === 'equal to'){
      console.log('CONDITIONAL TRIGGERED: EQUAL TO');
      if(dictionary[currentRule.variable] === currentRule.value) {
        console.log('INSIDE EQUAL TO: CONDITIONAL PASSED');
        reminderList.push(<p key={`message ${i}`}>Reminder triggered: {currentRule.message}</p>);
      }
    }
    // return reminderList;
  }

  console.log('reminderList: ', reminderList);

  const onLogout = () => {
    // ideally also delete the cookies but idk how to that yet
    // redirect the client to the /login endpoint
    const navigate = useNavigate();
    const path = '/login';
    navigate(path, { replace: true });
  }

  return (
    <div id='dashboard'>
      <nav>
      <button onClick = {onLogout}>logout</button>
      <Link to={'/edit'}>
        <button>
          Edit your reminders
        </button>
      </Link>
      </nav>
      <h1>Welcome, {props.nickname}!</h1>
      <SearchBar dispatchSearchLocation={props.dispatchSearchLocation}/>
      {/* <Reminders 
        userId={props.userId} 
        reminders={props.reminders} /> */}
      <p>Your Forecast:</p>
      <CurrentWeather 
        username={props.username} 
        city={props.city} 
        state={props.state} 
        country={props.country} 
      currentTemp={props.currentTemp} 
        currentAQI={props.currentAQI} 
        currentWindSpeed={props.currentWindSpeed} />
      {/* <Reminders/> */}


      {/* <button id='setFavorite' onClick={addToFavorites}>Add To Favorites</button> */}
      {reminderList}

    </div>
  )}
  ;

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

/**

// RULES table
// _id, user_id, variable, condition, value, alert

const dictionary = {
  'wind speed': state.main.currentWindSpeed,
  'other varname': what it actually is here in the front end,
  ...
}

for (let i=0; i < data.length; i++) {
  const currentRule = data[i];

  if (currentRule.condition === 'greater than') {
    if (dictionary[currentRule.variable] > currentRule.value) alertsList.push(<Card message=currentRule.alert />);
  }
  
  if (currentRule.condition === 'less than') {
    if (dictionary[currentRule.variable] < currentRule.value) alertsList.push(<p> message=currentRule.alert </p>);
  }
  
  if (currentRule.condition === 'equal to') {
    if (dictionary[currentRule.variable] === currentRule.value) alertsList.push(<Card message=currentRule.alert />);
  }

*/


//   const addToFavorites = () => {
//     fetch('/server', {
//         method: 'POST',
//         body: JSON.stringify({
//             userId: props.username_id,
//             city: props.city,
//             state: props.state,
//         })
//     })
//     .then(data => data.json())
//     .then(data => {
//         console.log(data)
//         //invoke dispatch here
//         props.dispatchAddFavorite(data)
//         // apiCall()
//     })
//     .catch(error => console.log('error: ', error))
//   }
//   // iterate through array of favorites from the state
//   const favComponents = [];

//   console.log('favorites.length: ', props.favorites.length);

//   for (let i = 0; i < props.favorites.length; i++) {
//     const favoritePlace = props.favorites[i] // <- current favorite {city: '' , state: ''}
//     favComponents.push(<FavWeather city={favoritePlace.city} favPlaceIndex={i}/>);
//     favComponents.push(<RemoveFavButton removeId={favoritePlace.id} />);
//     // currentAQI currentTemp currentWindSpeed
//   }

//   console.log('favComponents: ', favComponents);

//   for (let i = 0; i< props.favorites.length; i++) {
//     const favoritePlace = props.favorites[i] // <- current favorite {city: '' , state: ''}
//     fetch(`http://api.airvisual.com/v2/city?city=${favoritePlace.city}&state=${favoritePlace.state}&country=USA&key=${process.env.API_KEY}`)
//     .then(data => data.json())
//     .then((data) => {
//       console.log('data: ', data);
//       // we need to update state with API fetch results here
//       const dispatchData = {
//         temp: data.data.current.weather.tp,
//         aqi: data.data.current.pollution.aqius,
//         wind: data.data.current.weather.ws,
//         index: i
//       };
//       // append a component to the favComponents
//       // this.props.dispatchUpdateFavorites()
//     })
//     .catch(error => console.log('error with api fetch (favorites): ', error));
//   }
  // make api request with each favorite location -> take the results from that api response
  // drill it down to -> create instances of components displaying weather info for each fav place
  // console.log(`reminders: ${props.reminders[0].message}`)
