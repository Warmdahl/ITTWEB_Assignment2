var mongoose = require('mongoose')
const WorkoutList = mongoose.model('Workout')
const bcrypt = require('bcrypt');


//Get for all workouts (List of all workoutprograms)
module.exports.workoutList = async function(req, res){
    const workouts = await WorkoutList.find({}).catch(reason => res.sed("error"));
    //res.render("workoutlist", {title: "Workoutprogram list", workouts})
    console.log("test");
    res.send(workouts);
}

//Create workoutprogram
module.exports.createworkout = async function(req, res) {
    console.log(req.body.name)
    var workout = await WorkoutList.create({name: req.body.name}).catch(reason => res.render("error", reason));
    if(workout){
        res.json(workout);
    }else{
        res.status(403).json({"Message" : "Workout was not created"})
    }
    
}

//Create Exercise
module.exports.createExercise = async function(req, res) {
    var workoutprogram = await WorkoutList.findOne({_id: req.params.id}).catch(reason => res.render("error", reason));
    
    let exercise = {
        name: req.body.name, 
        description: req.body.description,
        numbersets: req.body.numbersets,
        timerep: req.body.timerep}

    if(exercise){
        workoutprogram.exercises.push(exercise);
        await workoutprogram.save();      
        res.json(exercise);
    }
}

//Show all exercises in a workoutprogram
module.exports.showExcinWok = async function(req, res){
    id = req.params.id
    console.log(id)
    var workoutprogram = await WorkoutList.findOne({_id: id}).catch(reason => res.render("error", reason));
    
    if(workoutprogram){
        res.send(workoutprogram)
    }
}

