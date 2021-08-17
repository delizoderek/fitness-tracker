const apiRouter = require('express').Router();
const db = require('../models');

// Get last workout
apiRouter.get('/',(req,res) => {
    res.send('Hello from your server!');
});

// Get workouts in range
apiRouter.get('/range',(req,res) => {
    res.send('Hello from your server!');
});

// Add exercise to current workout
apiRouter.put('/',(req,res) => {
    console.log('req.baseurl');
    res.send(`${req.method} request received`);
});

// Create new workout
apiRouter.post('/',(req,res) => {
    console.log('req.baseurl');
    res.send(`${req.method} request received`);
});

module.exports = apiRouter;