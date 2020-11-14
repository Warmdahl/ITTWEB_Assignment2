var express = require('express');
const { UserLogIn } = require('../Controllers/usercontroller');
var router = express.Router();
var workoutcontroller = require('../Controllers/workoutcontroller')
var jwt = require('express-jwt');
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['HS256']
});

//GET all workouts
router.get('/workoutlist', workoutcontroller.workoutList)

//Post a workout
router.post('/createworkout', auth, workoutcontroller.createworkout)

//Get specicik workout
router.get('/showexcinwok/:id', workoutcontroller.showExcinWok)

//Post a exercise to a workoutprogram
router.post('/createexercise/:id', auth, workoutcontroller.createExercise)

module.exports = router;
