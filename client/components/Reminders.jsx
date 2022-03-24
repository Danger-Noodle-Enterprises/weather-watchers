import React from 'react';
import { connect } from 'react-redux';


//prop drill

const Reminders = (props) => {

  // <p onClick={props.displayReminder}></p>
  //construct a dictionary where 

  // const dictionary = {
  //   'current temperature': props.currentTemp,
  //   'current wind speed': props.currentWindSpeed,
  //   'current AQI': props.currentAQI
  // }

  // save returned favorite places array to state
  // fetch(`/reminders/${props.userId}`)
  // .then( response => {
  //   const status = response.status;
  //   return response.json();
  // })
  // .then( data => {
  //   this.props.dispatchUpdateFavorites(data);
  //   console.log('Reminders data: ', data);
    // save array of Reminders to state at state.favorites
    
  // });

  // const reminders = [];


//invoke fetch request bring in all the reminders based on userID
//loop through data response object 




//if (currentRule.condition === 'greater than'){
  //if (dictionary[currentRule.variable] > currentRule.value) alertsList.push(<p>  message=currentRule.alert </p>);
}




  const remindersForDashboard = [];




  //   for (let i = 0; i < props.reminders.length; i++) {
  //   const favoritePlace = props.favorites[i] // <- current favorite {city: '' , state: ''}
  //   favComponents.push(<FavWeather city={favoritePlace.city} favPlaceIndex={i}/>);
  //   favComponents.push(<RemoveFavButton removeId={favoritePlace.id} />);
  //   // currentAQI currentTemp currentWindSpeed
  // }


//we have access to current temp, current AQI, and current WindSpeed
//currentTemp, currentAQI, currentWindSpeed

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



  <div id ='remindersList'>
    <ol>
      
  

    </ol>
  </div>


export default Reminders.jsx;