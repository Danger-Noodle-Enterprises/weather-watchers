import * as types from '../constants/actionTypes';


export const searchForLocation = weatherData => ({
  type: types.SEARCH_LOCATION,
  payload: weatherData
})

export const storeUserData = userData => ({
  type: types.STORE_USERINFO, 
  payload: userData
})

export const addReminder = userData => ({
  type: types.ADD_REMINDER, 
  payload: reminderData
})

export const updateReminder = userData => ({
  type: types.UPDATE_REMINDER, 
  payload: reminderData
})

export const deleteReminder = userData => ({
  type: types.DELETE_REMINDER, 
  payload: reminderData
})



export const addFavorite = newLocation => ({
  type: types.ADD_FAVORITE,
  payload: newLocation,
});
  
export const addFriend = friendId => ({
  type: types.ADD_FRIEND,
  payload: friendId,
});

export const deleteFavorite = locationId => ({
  type: types.DELETE_FAVORITE, 
  payload: locationId
})

export const updateFavorites = locationsArray => ({
  type: types.UPDATE_FAVORITES,
  payload: locationsArray
})

export const apiAppendFavs = apiData => ({
  type: types.API_FAVORITES,
  payload: apiData
})
