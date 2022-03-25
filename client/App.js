import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login.js'
import SignUp from './SignUp.js'
import Dashboard from './Dashboard.js';
import EditReminders from './EditReminders.js';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions/actions';
// import {Navigate} from 'react-router-dom';
// import { Redirect } from 'react-router-dom'; 


// import EditReminders from './EditReminders.js';


// check cookie exists here 
// http://localhost:8080 vs http://localhost:8080/login

// we need to send a request to the backend 
// the backend checks the cookie sent with the request
// the backend sends back whether our cookie a valid cookie
// once we get the fetch results from the backend
// if the cookie was valid render the app
// else render the login page
/**
  console.log('loggedIn: ', this.state.loggedIn)
  this.state.loggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login"/>;
  
  export default connect(null, mapDispatchToProps)(LoginBox);

*/

// const mapStateToProps = state => {
//   return {
//     userId: state.main.userId,
//     reminders: [...state.main.reminders]
//   }
// }

const mapDispatchToProps = dispatch => ({
  // create functions that will dispatch action creators
  dispatchSearchLocation: (newSearchLocation) => {
    dispatch(actions.searchForLocation(newSearchLocation));
  },

  dispatchUsernameStorage: (username) => {
    dispatch(actions.storeUserData(username));
  }, 
  
//   dispatchAddFavorite: (location) => {
//     dispatch(actions.addFavorite(location));
//   },

//   dispatchUpdateFavorites: (locationsArray) => {
//     dispatch(actions.updateFavorites(locationsArray));
//   }
});

const App = function (props) { // async 
  let cookieChecked = false;
  // console.log('App.js: outside if cookieChecked block');
  if (!cookieChecked) {
    // console.log('App.js: inside if !cookieChecked block');
    const port = 3000;
    const url = `http://localhost:${port}/user/login`;
    
    const navigate = useNavigate();
    

    useEffect(() => {

      function checkCookie() { // async 
        fetch(url, {
          credentials: "include",
          method: 'GET', 
        })
        .then((data) => {
          return data.json()
        })
        .then((data) => {
          // console.log('App.js: what is the data ', data);
          // console.log('App.js: cookie status is ', data.cookieExists);
          
          // data.cookieExists is a boolean
          if (data.cookieExists) {
            props.dispatchUsernameStorage({userId: data.username_id, nickname: data.nickname});
            // query the IQAir API and dispatch the returned data to the state/store
            fetch(`http://api.airvisual.com/v2/nearest_city?key=${process.env.API_KEY}`)
            .then(data => data.json())
            .then((data) => {
              console.log('data: ', data);
              // searchForLocation(data)
              // save the favorites list of this user returned from the backend on a successful login
              props.dispatchSearchLocation(data);
            })
            .catch(error => console.log('error in api get request: ', error));
            navigate('/dashboard', { replace: true});
          } // , { replace: true }
          else  navigate('/login', { replace: true }); // , { replace: true }
        });
      }
      
      checkCookie();
      // console.log('App.js: sent checkcookie request');
      cookieChecked = true;
      // console.log('App.js: cookieChecked: ', cookieChecked);
    }, []);

  }

  // console.log('App.js: after if !cookieChecked block');

  return (
    <div>
      <Routes>
        {/* <Route path ='/' element={<Login />} />  */}
        {/* <Route path ='/' render={checkCookie} /> */}
        <Route path ='/login' element={<Login />}/>
        <Route path ='/signup' element={<SignUp />}/>
        <Route path ='/dashboard' element={<Dashboard />}/>
        <Route path ='/edit' element={<EditReminders />}/>
      </Routes>
    </div>
  )
}

export default connect(null, mapDispatchToProps)(App);