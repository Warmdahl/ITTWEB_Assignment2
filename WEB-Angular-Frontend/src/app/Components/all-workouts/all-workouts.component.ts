import { Component, OnInit } from '@angular/core';
import { ApiWorkoutService } from '../../Services/api-workout.service';
import { Workout } from '../../Interfaces/workout'

@Component({
  selector: 'app-all-workouts',
  templateUrl: './all-workouts.component.html',
  styleUrls: ['./all-workouts.component.css']
})
export class AllWorkoutsComponent implements OnInit {
  workoutList: Workout[]
  loggedin = false
  tempWorkout: Workout

  constructor(
    private workoutService: ApiWorkoutService
  ) { }

  ngOnInit(): void {
    this.getWorkouts();
    if(localStorage.getItem("JWT")==null){
      this.loggedin=true
    }else{
      this.loggedin=true
    }
  }

  getWorkouts(): void{
    this.workoutService.getWorkoutList()
      .subscribe(workouts => this.workoutList = workouts);
  }

  login(){

  }

  add(name: String): void{
    this.workoutService.createWorkout({name} as Workout)
    .subscribe(workout => {this.tempWorkout = workout})
    
  }

  gotoWO(){

  }

}
