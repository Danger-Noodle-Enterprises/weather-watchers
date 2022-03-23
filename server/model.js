// require in Pool from postgres
const { Pool } = require('pg');
const { AsyncDependenciesBlock } = require('webpack');
// create a PG URI to store the key to our database on Elephant SQL
const PG_URI = 'postgres://mwwpjhik:CvPP5d2xi8ON5DV_het_-kFt-a4YK3Pd@kashin.db.elephantsql.com/mwwpjhik';
// password: CvPP5d2xi8ON5DV_het_-kFt-a4YK3Pd
// API key: 7a4185aa-2d5c-41ca-9069-76eec2553383
// create a new pool to connect our server to our database
const pool = new Pool({
  connectionString: PG_URI,
})


// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};


// Tables and table paramaters for PG database:
// ============================================
// Users:
// ======
// _id         | Serial Prime Key
// username    | varchar
// password    | varchar
// city        | varchar
// state       | varchar
// country     | varchar



// Favorites:
// ==========
// _id        | integer 
// _userid    | integer  (foreign-Key)
// city       | varchar
// state      | varchar
// country    | varchar
// ============================================
//                      /
// Users ---------------- favorites 
//                      \
// ============================================
// export our pool

