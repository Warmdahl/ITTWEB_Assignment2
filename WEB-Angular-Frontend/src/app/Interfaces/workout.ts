export interface Workout {
    name: String,
    exercises: {
        type: [{name: String,
        description: String,
        numbersets: Number,
        timerep: Number}]
    }
}