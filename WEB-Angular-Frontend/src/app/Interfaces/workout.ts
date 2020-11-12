export interface Workout {
    _id: String,
    name: String,
    exercises: {
        type: [{name: String,
        description: String,
        numbersets: Number,
        timerep: Number}]
    }
}