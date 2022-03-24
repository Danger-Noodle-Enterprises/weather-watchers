import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login.js'
import SignUp from './SignUp.js'
import weatherApp from './App.js'
import Dashboard from './Dashboard.js';
import { useNavigate } from 'react-router-dom';
import EditReminders from './EditReminders.js';


// check cookie exists here 
// http://localhost:8080 vs http://localhost:8080/login

// we need to send a request to the backend 
// the backend checks the cookie sent with the request
// the backend sends back whether our cookie a valid cookie
// once we get the fetch results from the backend
// if the cookie was valid render the app
// else render the login page


export default function App() {

  // const port = 3000;
  // const url = `http://localhost:${port}`;
  // let navigate = useNavigate();

  // // let cookieExists;
  // async function checkCookie() { 
  //   fetch(url, {
  //     method: 'GET', 
  //       credentials: 'include'//?
  //   })
  //   .then((data) => {
  //     return data.json()
  //   })
  //   .then((data) => {
  //     // data.cookieStatus is a boolean
  //     if (data.cookieStatus) navigate('/dashboard', { replace: true });
  //     else navigate('/login', { replace: true });
  //   });
  // }
  // //await checkCookie();
  // checkCookie();

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path ='/' element={<Login />} /> 
          {/* <Route path ='/login' element={<Login />}/> */}
          <Route path ='/signup' element={<SignUp />}/>
          <Route path ='/dashboard' element={<Dashboard />}/>
          <Route path ='/edit' element={<EditReminders />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}