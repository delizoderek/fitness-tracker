const router = require('express').Router();
const apiRoutes = require('./apiRoutes');

router.use('/api/workouts', apiRoutes);

module.exports = router;

