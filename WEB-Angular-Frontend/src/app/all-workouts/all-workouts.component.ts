import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiWorkoutService } from '../api-workout.service';
import { Workout } from '../Interfaces/workout'

@Component({
  selector: 'app-all-workouts',
  templateUrl: './all-workouts.component.html',
  styleUrls: ['./all-workouts.component.css']
})
export class AllWorkoutsComponent implements OnInit {
  apiurl = "http://localhost:8080/workouts/workoutlist"
  workoutList: Workout[]
  constructor(
    private workoutService: ApiWorkoutService
  ) { }

  ngOnInit(): void {
    this.getWorkouts();
  }

  getWorkouts(): void{
    this.workoutService.getWorkoutList()
      .subscribe(workouts => this.workoutList = workouts);
  }

}
