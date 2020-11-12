import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { AddActivityComponent } from '../app/add-activity/add-activity.component';
import { AddExerciseComponent } from '../app/add-exercise/add-exercise.component';
import { AllWorkoutsComponent } from '../app/all-workouts/all-workouts.component';
import { LoginComponent } from '../app/login/login.component';
import { WorkoutDetailsComponent } from '../app/workout-details/workout-details.component';

const routes: Routes = [
  {path: 'addactivity', component: AddActivityComponent},
  {path: 'addexercise', component: AddExerciseComponent},
  {path: 'allworkouts', component: AllWorkoutsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'workoutdetail', component: WorkoutDetailsComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
