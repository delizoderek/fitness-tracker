const apiRouter = require('express').Router();
const db = require('../models');

// Get last workout
apiRouter.get('/',(req,res) => {
    db.Workout.find({})
    .sort({day:-1})
    .then(data => {
        res.json(data);
    });
});

// Get workouts in range
apiRouter.get('/range',(req,res) => {
    res.send('Hello from your server!');
});

// Add exercise to current workout
apiRouter.put('/',(req,res) => {
    db.Workout.find({})
    // .sort({ date: -1 })
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// Create new workout
apiRouter.post('/',(req,res) => {
    console.log('req.baseurl');
    res.send(`${req.method} request received`);
});

module.exports = apiRouter;