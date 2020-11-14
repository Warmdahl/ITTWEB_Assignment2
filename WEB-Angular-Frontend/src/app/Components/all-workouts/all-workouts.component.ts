import { Component, OnInit } from '@angular/core';
import { ApiWorkoutService } from '../../Services/api-workout.service';
import { Workout } from '../../Interfaces/workout'
import {Location} from '@angular/common'
import {Router} from '@angular/router'
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { ApiUsersService } from 'src/app/Services/api-users.service';
import { User } from 'src/app/Interfaces/user';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-all-workouts',
  templateUrl: './all-workouts.component.html',
  styleUrls: ['./all-workouts.component.css']
})
export class AllWorkoutsComponent implements OnInit {
  workoutList: Workout[]
  public activitiesList;
  loggedin = false
  tempWorkout: Workout

  constructor(
    private workoutService: ApiWorkoutService,
    private location: Location,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: ApiUsersService
  ) { }

  ngOnInit(): void {
    this.getWorkouts();
    if(this.authenticationService.isLoggedIn()){
      this.loggedin=true
    }else{
      this.loggedin=false
    }
  }

  getWorkouts(): void{
    this.workoutService.getWorkoutList()
      .subscribe(workouts => this.workoutList = workouts);
  }

  add(name: String): void{
    this.workoutService.createWorkout({name} as Workout)
    .subscribe(workout => {this.tempWorkout = workout;
    this.router.navigate(['workoutdetail/'+this.tempWorkout._id])})
    
  }

  gotoWO(){

  }

}
