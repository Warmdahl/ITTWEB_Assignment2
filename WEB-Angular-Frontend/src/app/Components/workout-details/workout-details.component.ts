import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiWorkoutService } from '../../Services/api-workout.service';
import { Workout } from '../../Interfaces/workout';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-workout-details',
  templateUrl: './workout-details.component.html',
  styleUrls: ['./workout-details.component.css']
})
export class WorkoutDetailsComponent implements OnInit {

  public loggedIn: boolean
  workout: Workout
  public id=""
  constructor(
    private route: ActivatedRoute,
    private workoutService: ApiWorkoutService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getWorkout()
    this.loggedIn = this.authenticationService.isLoggedIn()
  }

  getWorkout(): void{
    const id: String = this.route.snapshot.paramMap.get('id').toString()
    this.workoutService.getWorkout(id)
    .subscribe(workout => this.workout = workout)
  }

  addExercise(): void {
    this.router.navigate(['addexercise/'+this.workout.name])
  }

  addActivity(): void {
    this.router.navigate(['addactivity/'+this.workout.name])
  }

}
