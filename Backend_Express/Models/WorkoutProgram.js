const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutProgramSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    exercises: {
        type: [{name: String,
        description: String,
        numbersets: Number,
        timerep: Number}]        
    }
})

mongoose.model('Workout', WorkoutProgramSchema)