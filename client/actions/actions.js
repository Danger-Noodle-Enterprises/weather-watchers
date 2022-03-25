import * as types from '../constants/actionTypes';


export const searchForLocation = weatherData => ({
  type: types.SEARCH_LOCATION,
  payload: weatherData
})

export const storeUserData = userData => ({
  type: types.STORE_USERINFO, 
  payload: userData
})

export const addReminder = reminderData => ({
  type: types.ADD_REMINDER, 
  payload: reminderData
})

export const updateReminders = reminders => ({
  type: types.UPDATE_REMINDERS, 
  payload: reminders
})

export const editReminder = reminderData => ({
  type: types.EDIT_REMINDER, 
  payload: reminderData
})

export const deleteReminder = reminderId => ({
  type: types.DELETE_REMINDER, 
  payload: reminderId
})



// export const addFavorite = newLocation => ({
//   type: types.ADD_FAVORITE,
//   payload: newLocation,
// });
  
// export const addFriend = friendId => ({
//   type: types.ADD_FRIEND,
//   payload: friendId,
// });

// export const deleteFavorite = locationId => ({
//   type: types.DELETE_FAVORITE, 
//   payload: locationId
// })

// export const updateFavorites = locationsArray => ({
//   type: types.UPDATE_FAVORITES,
//   payload: locationsArray
// })

// export const apiAppendFavs = apiData => ({
//   type: types.API_FAVORITES,
//   payload: apiData
// })
