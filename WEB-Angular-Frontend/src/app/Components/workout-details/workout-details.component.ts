import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiWorkoutService } from '../../Services/api-workout.service';
import { Workout } from '../../Interfaces/workout';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { ApiUsersService } from 'src/app/Services/api-users.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-workout-details',
  templateUrl: './workout-details.component.html',
  styleUrls: ['./workout-details.component.css']
})
export class WorkoutDetailsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'numberofsets', 'timerep'];
  public loggedIn: boolean;
  workout: Workout;
  public id = "";
  public activitiesList;

  constructor(
    private route: ActivatedRoute,
    private workoutService: ApiWorkoutService,
    private authenticationService: AuthenticationService,
    private userService: ApiUsersService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getWorkout();
    this.loggedIn = this.authenticationService.isLoggedIn();

    this.getActivitiesforUser();
  }

  // Method for getting the exercises mapped to a workout
  getWorkout(): void{
    const id: String = this.route.snapshot.paramMap.get('id').toString();
    this.workoutService.getWorkout(id)
    .subscribe(workout => this.workout = workout);
  }

  // Method for getting the activities specific for a user in a workout
  getActivitiesforUser() {
    const wokid: String = this.route.snapshot.paramMap.get('id').toString();
    console.log(wokid);

    const username = this.authenticationService.UserNameFromToken();

    this.userService.getActivitiesUserWok(username, wokid)
      .subscribe(response => this.activitiesList = response);
  }

  // Method for redirect to add exercise component
  addExercise(): void {
    this.router.navigate(['addexercise/' + this.workout._id]);
  }

  // Method for redirect to add activity component
  addActivity(): void {
    this.router.navigate(['addactivity/' + this.workout._id]);
  }

  // Method for go back btn
  goBack(): void {
    this.location.back();
  }

}
