import { Component, OnInit } from '@angular/core';
import { ApiWorkoutService } from '../../Services/api-workout.service';
import { Workout } from '../../Interfaces/workout'
import {Location} from '@angular/common'
import {Router} from '@angular/router'
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { ApiUsersService } from 'src/app/Services/api-users.service';
import { User } from 'src/app/Interfaces/user';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-all-workouts',
  templateUrl: './all-workouts.component.html',
  styleUrls: ['./all-workouts.component.css']
})
export class AllWorkoutsComponent implements OnInit {
  addWorkoutForm: FormGroup
  workoutList: Workout[]
  public activitiesList;
  loggedin = false
  tempWorkout: Workout

  constructor(
    private workoutService: ApiWorkoutService,
    private location: Location,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: ApiUsersService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getWorkouts();
    if(this.authenticationService.isLoggedIn()){
      this.loggedin=true
    }else{
      this.loggedin=false
    }
    this.addWorkoutForm = this.formBuilder.group({
      workoutName: ['', [Validators.required]]
    })
  }

  get f(){
    return this.addWorkoutForm.controls
  }

  getWorkouts(): void{
    this.workoutService.getWorkoutList()
      .subscribe(workouts => this.workoutList = workouts);
  }

  add(): void{
    //this.submitted = true;

    // stop here if form is invalid
    if(this.addWorkoutForm.invalid) {
      return;
    }
    this.workoutService.createWorkout(this.f.workoutName.value as Workout)
    .subscribe(workout => {this.tempWorkout = workout;
    this.router.navigate(['workoutdetail/'+this.tempWorkout._id])})
    
  }

  gotoWO(){

  }

}
