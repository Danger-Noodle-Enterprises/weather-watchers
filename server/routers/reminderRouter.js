const { Router } = require('express');
const reminderController = require('../controllers/reminderController.js');
// create and require in new controllers


// create a new router instance
const reminderRouter = Router();

// handle different http requests to endpoints following /reminder
// POST (Create)
reminderRouter.post('/', reminderController.createReminder, (req, res) => {
  // successful - send back a status of 200 and the data from the user table
  res.status(200).json(res.locals.reminder);
});

// GET (Read)
reminderRouter.get('/', reminderController.getReminders, (req, res) => {
  // successful - send back a status of 200 and the data from the user table
  res.status(200).json(res.locals.reminders);
});

// PUT (Update)
reminderRouter.put('/:id', reminderController.updateReminder, (req, res) => {
  // successful - send back a status of 200 and the data from the user table
  res.status(200).json(res.locals.reminder);
});

// DELETE (Delete)
reminderRouter.delete('/:id', reminderController.deleteReminder, (req, res) => {
  // successful - send back a status of 200 and the data from the user table
  res.status(200).json('reminder has been deleted');
});


module.exports = reminderRouter;
