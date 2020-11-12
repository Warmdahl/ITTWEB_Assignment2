import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiWorkoutService } from '../../Services/api-workout.service';
import { Workout } from '../../Interfaces/workout';

@Component({
  selector: 'app-workout-details',
  templateUrl: './workout-details.component.html',
  styleUrls: ['./workout-details.component.css']
})
export class WorkoutDetailsComponent implements OnInit {

  workout: Workout
  constructor(
    private route: ActivatedRoute,
    private workoutService: ApiWorkoutService
  ) { }

  ngOnInit(): void {
    this.getWorkout()
  }

  getWorkout(): void{
    const id = +this.route.snapshot.paramMap.get('id')
    this.workoutService.getWorkout(id)
    .subscribe(workout => this.workout = workout)
  }

}
