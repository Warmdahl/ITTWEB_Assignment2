var express = require('express');
const { UserLogIn } = require('../Controllers/usercontroller');
var router = express.Router();
var workoutcontroller = require('../Controllers/workoutcontroller')

//GET all workouts
router.get('/workoutlist', workoutcontroller.workoutList)

//Post a workout
router.post('/createworkout', workoutcontroller.createworkout)

//Get specicik workout
router.get('/showexcinwok/:id', workoutcontroller.showExcinWok)

//Post a exercise to a workoutprogram
router.post('/createExercise/:id', workoutcontroller.createExercise)

module.exports = router;
