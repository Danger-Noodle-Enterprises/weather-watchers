const db = require('../model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const saltRounds = 1;
// const encryptedThing = await bcrypt.hash(thing, saltRounds);
// const match = await bcrypt.compare(rawVar, result.rows[0].storedVar); // result.rows[0] <- the syntax for accessing pSQL result

const cookieController = {};

//create a session controller that will set a cookie when a user creates an account and logs into the app
//cookie will have expire after x time
//set to HttpOnly: true  so client-side JavaScript cannot access your cookie, 
//This greatly decreases the likelihood of it being stolen or manipulated by malicious JavaScript running on the client

cookieController.setCookie = async (req, res, next) => {
  // create a cookie
  // let cookie = req.cookies['app_user']; 
  // res.locals.cookieSet = false; 
  // if (!cookie) {
  console.log('seting a cookie'); 

  await crypto.randomBytes(15, async (err, buff) => {
    // use .toString with encoding 'utf8'
    if (err) {
      // console.log('error in generating random cookie string');
      const errObj = {
        log: 'Error in generating random cookie string',
        status: 418,
        message: { err: 'An error occurred while generating a cookie' }
      };
      next(errObj);
    }

    const token = buff.toString('hex');
    console.log('token: ', token);
    console.log('token length: ', token.length);
    res.locals.cookieSet = true;
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080'); // CORS
    res.cookie('board_user', token, {maxAge: 300000, httpOnly: true, secure: true }); // Cookie: board_user = 001203012038sdfsd
    const queryString = `UPDATE users SET cookie = $1 WHERE username_id = $2 RETURNING *;`;
    const encryptedToken = await bcrypt.hash(token, saltRounds);
    const params = [encryptedToken, res.locals.foundUser.username_id];
    const result = await db.query(queryString, params); // maybe await
    console.log(result);
    res.append('Set-Cookie', 'board_user=' + token + ';');
    next();
  });
  // } else {
  //   console.log('cookie exists', cookie);
  //   next();
  // }
  // save the cookie assigned to the user in the user's database entry 
  // make sure to return the cookie in the response 
  // invoke next()
}

// uniqueness of cookie: when setting, first query to see if existing cookie overlaps 
// if yes try generating a new cookie random string

cookieController.checkCookie = async (req, res, next) => {
  // only invoke next() if there is a valid cookie included in the request
  //   check if the cookie is valid by looking up the cookie value we set on the user's database entry
  // else throw an error that the front end will handle as a redirect to the login page
  console.log('checking for cookies');
  // check if client sent a cookie
  const cookie = req.cookies.board_user;
  console.log(cookie);
  const queryString = `
  SELECT 
  username_id, username, password, nickname, email, tos, city, state, cookie
  FROM users
  WHERE cookie = $1;
  `;
  const param = [cookie];
  const result = await db.query(queryString, param); // maybe await
  // console.log(result); 
  if (result.rowCount === 0) {
    match = false;    
  } else {
    const match = await bcrypt.compare(cookie, result.rows[0].cookie); 
  }

  if (!match) {
    // no cookie: needs to log in
    // currently: doing nothing
    console.log('no cookie detected');
    res.locals.foundUser = result.rows[0];
    res.locals.cookieStatus = false;
  } else {
    // if cookie was already present 
    // how do we check if cookie is stale?
    console.log('cookie detected');
    res.locals.foundUser = result.rows[0];
    res.locals.cookieStatus = true;
  }
  next();
  // res.status(200).json({cookieExists: res.locals.cookieStatus});
}


module.exports = cookieController;