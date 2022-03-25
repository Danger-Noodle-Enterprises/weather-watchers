const db = require('../model');

const reminderController = {};

const allowedValues = {
  variable: ['wind speed', 'etc'],
  condition: ['greater than', 'less than', 'equal to']
}

//allowed values
// if (allowedValues.variable.contains(req.body.variable)) // then save it to the database
// else // short cirtcuit before trying to put this in the database

//createReminder
reminderController.createReminder = async (req, res, next) => {
  const {rec_id, user_id, variable, condition, value, message} = req.body; 

  try {
    const query = `INSERT INTO recs (user_id, variable, condition, value, message) VALUES ($1, $2, $3, $4, $5) RETURNING *`; 
    const params = [user_id, variable, condition, value, message]; 
    const result = await db.query(query, params); 
    res.locals.reminder = result.rows[0]
    return next(); 
  }
  catch(err){
    next({
      log: 'Express error handler caught in createReminder',
      status: 418,
      message: { err: 'An error occurred in createReminder' },
    })
  }
};

//getReminders
reminderController.getReminders = async (req, res, next) => {

  try{
    const query = await db.query(`SELECT * FROM recs`); 
    // console.log(query.rows);
    res.locals.reminders = query.rows; 
    return next(); 

  }
  catch(err){
    next({
      log: 'Express error handler caught in getReminder',
      status: 418,
      message: { err: 'An error occurred in getReminder' },
    })

  }

  
};

//updateReminder
reminderController.updateReminder = async (req, res, next) => {
  const {id} = req.params; 
  const {variable, condition, value, message} = req.body;
  try {
    const query = `UPDATE recs SET variable= $1, condition = $2, value = $3, message = $4 WHERE rec_id = $5`;
    const param = [variable, condition, value, message, rec_id];
    await db.query(query, param); 
    const updatedModel = await db.query(`SELECT * FROM rec WHERE rec_id = '${id}'`);
    res.locals.reminder = updatedModel.rows[0];
    return next();
  }
  catch(err){
    next({
      log: 'Express error handler caught in updateReminder',
      status: 418,
      message: { err: 'An error occurred in updateReminder' },
    })
  }
  
};

//deleteReminder
reminderController.deleteReminder = async (req, res, next) => {
  const {id} = req.params; 
  try {
    const query = `DELETE FROM recs WHERE rec_id = $1`
    const param = [id]
    // const result = db.query(query, param); 
    return next(); 

  }
  catch{
    next({
      log: 'Express error handler caught in deleteReminder',
      status: 418,
      message: { err: 'An error occurred in deleteReminder' },
    })
  }

};



module.exports = reminderController;
