import * as types from '../constants/actionTypes';

const initialState = {
    userId: '',
    nickname: '',
    city: '', 
    stateName: '', 
    country: '',
    currentTemp: '', 
    currentAQI: '', 
    currentWindSpeed: '',
    currentWeather: '', // ic 
    reminders: [{rec_id: 1, variable: 'temperature', condition: 'greater than', value: 80, message: 'hot'}, {rec_id: 2, variable: 'temperature', condition: 'less than', value: 79, message: 'cold'}] // arry of reminder objs
    //favorites: []
};

// {
//     "ts": "2017-02-01T03:00:00.000Z",  //timestamp
//     "aqius": 21, //AQI value based on US EPA standard
//     "aqicn": 7, //AQI value based on China MEP standard
//     "tp": 8, //temperature in Celsius
//     "tp_min": 6, //minimum temperature in Celsius
//     "pr": 976,  //atmospheric pressure in hPa
//     "hu": 100, //humidity %
//     "ws": 3, //wind speed (m/s)
//     "wd": 313, //wind direction, as an angle of 360° (N=0, E=90, S=180, W=270)
//     "ic": "10n" //weather icon code, see below for icon index

        // ic code
        // clear sky (day)	01d.png	
        // clear sky (night)	01n.png	
        // few clouds (day)	02d.png	
        // few clouds (night)	02n.png	
        // scattered clouds	03d.png	
        // broken clouds	04d.png	
        // shower rain	09d.png	
        // rain (day time)	10d.png	
        // rain (night time)	10n.png	
        // thunderstorm	11d.png	
        // snow	13d.png	
        // mist	50d.png	
//   }, 

const dashboardReducer = (state = initialState, action) => {
    // let favorites;
    switch (action.type) {
        case types.SEARCH_LOCATION: {
            console.log('hit reducer')
            const city = action.payload.data.city
            const stateName = action.payload.data.state
            const country = action.payload.data.country
            const temp = action.payload.data.current.weather.tp
            const airQ = action.payload.data.current.pollution.aqius
            const wind = action.payload.data.current.weather.ws
        
        const newState = {
            ...state,
            city, 
            stateName, 
            country,
            currentTemp: temp, 
            currentAQI: airQ, 
            currentWindSpeed: wind
            }
        
        console.log('updated state: ', newState)
        return newState
        }

        case types.STORE_USERINFO: {
            console.log('Payload: ', action.payload);
            const { userId, nickname } = action.payload;

            return {
                ...state,
                userId,
                nickname
            }
        }
        case types.ADD_REMINDER: { // payload is reminderData
          const reminderId = action.payload.data.reminder_id; // not need in here because it is auto created
          const reminderType = action.payload.data.reminder_type;
          const reminderCondition = action.payload.data.reminder_condition;
          const reminderValue = action.payload.data.reminder_value;
          const reminderMessage = action.payload.data.reminder_message;

          const reminderObj = {
            id: reminderId, //
            type: reminderType,
            condition: reminderCondition,
            value: reminderValue,
            message: reminderMessage
          }
          const newState = {
            ...state,
            reminders: state.reminders.concat(reminderObj)
          }
          return newState;
        }

        case types.DELETE_REMINDER: {
          const newReminders = state.reminders.filter((reminder) => {reminder.rec_id !== action.payload})
          const newState = {
            ...state,
            reminders: newReminders
          }
          return newState;
        }

        case types.UPDATE_REMINDERS: {
          const updateReminders = action.payload;
          return {
            ...state,
            reminders: updateReminders
          }
        }

        case types.EDIT_REMINDER: {
          const updatedReminder = action.payload;
          // state.reminders // <- this is an array of reminder objects
          // from that array find the matching rec_id and replace that state object with new object from payload
          let indexToBeUpdated; 

          for ( let i = 0; i < state.reminders.length; i++) {
            if(state.reminders[i].rec_id === updatedReminder.rec_id) indexOfReminderToBeUpdated = i
          }

          const updatedList = state.reminders;

          if (indexToBeUpdated) {
            updatedList[indexToBeUpdated] = updatedReminder;
          }

          return {
            ...state,
            reminders: updatedList
          }
        }

        // case types.ADD_FAVORITE: {
        //     const favoriteId = action.payload.data.favorite_id;
        //     const favoriteCity = action.payload.data.city;
        //     const favoriteStateName = action.payload.data.state;
        //     const favoriteCountry = action.payload.data.country;
        //     const favoriteTemp = action.payload.data.current.weather.tp;
        //     const favoriteAirQ = action.payload.data.current.pollution.aqius;
        //     const favoriteWind = action.payload.data.current.weather.ws;

        //     const favObj = {
        //         id: favoriteId,
        //         city: favoriteCity, 
        //         stateName: favoriteStateName, 
        //         country: favoriteCountry,
        //         currentTemp: favoriteTemp, 
        //         currentAQI: favoriteAirQ, 
        //         currentWindSpeed: favoriteWind};

        //     const newState = {
        //         ...state,
        //         favorites: state.favorites.concat(favObj)
        //         };
            
        //     console.log('updated state: ', newState);
        //     return newState;
        // }

        // case types.DELETE_FAVORITE: {
		// 	// take the current favorties array
            
        //     // initialize a new empty array to be the next favorites array state
        //     const newArray = [];
        //     // iterate over the current fav array and push it to the next favorites array only if id !== deleted_id
        //     for (let i = 0; i < state.favorites.length; i++) {
        //         // each favorite is an object
        //         if (state.favorites[i].id !== action.payload) {
        //             newArray.push(state.favorites[i]);
        //         }
        //     }
        //     // set state with new favorites array 
        //     const newState = {
        //         ...state,
        //         favorites: newArray
        //     };
        //     return newState;
        // }

        // case types.UPDATE_FAVORITES: {
        //     const userFavorites = action.payload;

        //     return {
        //         ...state, 
        //         favorites: userFavorites
        //     }
        // }
		
        // case types.API_FAVORITES: {
        //     const apiData = action.payload;

        //     const newFavorites = JSON.parse(JSON.stringify(state.favorites));

        //     newFavorites[apiData.index].currentTemp = apiData.temp;// currentAQI currentWindSpeed
        //     newFavorites[apiData.index].currentAQI = apiData.aqi;
		// 	newFavorites[apiData.index].currentWindSpeed = apiData.wind;
            
        //     return {
        //         ...state,
        //         favorites: newFavorites
        //     }
        // }

        default: {
            return state;
          }
    }
}

export default dashboardReducer