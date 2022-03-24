import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login.js'
import SignUp from './SignUp.js'
import Dashboard from './Dashboard.js';
import EditReminders from './EditReminders.js';
import { useNavigate } from 'react-router-dom';
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
*/


export default function App() { // async 
  let cookieChecked = false;
  console.log('App.js: outside if cookieChecked block');
  if (!cookieChecked) {
    console.log('App.js: inside if !cookieChecked block');
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
          console.log('App.js: what is the data ', data);
          console.log('App.js: cookie status is ', data.cookieExists);
          
          // data.cookieExists is a boolean
          if (data.cookieExists)  navigate('/dashboard', { replace: true}); // , { replace: true }
          else  navigate('/login', { replace: true }); // , { replace: true }
        });
      }
      
      checkCookie();
      // await checkCookie();
      console.log('App.js: sent checkcookie request');
      cookieChecked = true;
      console.log('App.js: cookieChecked: ', cookieChecked);
    }, []);

  }

  console.log('App.js: after if !cookieChecked block');

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