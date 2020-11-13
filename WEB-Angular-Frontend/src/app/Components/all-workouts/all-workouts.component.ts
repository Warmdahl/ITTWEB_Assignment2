import { Component, OnInit } from '@angular/core';
import { ApiWorkoutService } from '../../Services/api-workout.service';
import { Workout } from '../../Interfaces/workout'
import {Location} from '@angular/common'
import {Router} from '@angular/router'

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
    private workoutService: ApiWorkoutService,
    private location: Location,
    private router: Router
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
    .subscribe(workout => {this.tempWorkout = workout;
    this.router.navigate(['workoutdetail/'+this.tempWorkout._id])})
    
  }

  gotoWO(){

  }

}
