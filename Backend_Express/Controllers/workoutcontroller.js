var mongoose = require('mongoose')
const WorkoutList = mongoose.model('Workout')
const bcrypt = require('bcrypt');


//Get for all workouts (List of all workoutprograms)
module.exports.workoutList = async function(req, res){
    const workouts = await WorkoutList.find({}).catch(reason => res.render("error", reason));
    res.render("workoutlist", {title: "Workoutprogram list", workouts})
}

//Create workoutprogram
module.exports.createworkout = async function(req, res) {
    var workout = await WorkoutList.create({name: req.body.name}).catch(reason => res.render("error", reason));
    if(workout){
        res.redirect('//localhost:8080/workouts/workoutlist')
    }
}

//Create Exercise
module.exports.createExercise = async function(req, res) {
    var workoutprogram = await WorkoutList.findOne({name: req.params.id}).catch(reason => res.render("error", reason));
    
    let exercise = {
        name: req.body.name, 
        description: req.body.Description,
        numbersets: req.body.Numbersets,
        timerep: req.body.timereps}

    if(exercise){
        workoutprogram.exercises.push(exercise);
        await workoutprogram.save();      
        res.redirect('//localhost:8080/workouts/showexcinwok/' + workoutprogram.name);
    }
}

//Show all exercises in a workoutprogram
module.exports.showExcinWok = async function(req, res){
    var workoutprogram = await WorkoutList.findOne({name: req.params.id}).catch(reason => res.render("error", reason));
    
    if(workoutprogram){
        res.render('workout', {title: 'Someones program', workoutprogram})
    }
}

