import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { AddActivityComponent } from '../app/Components/add-activity/add-activity.component';
import { AddExerciseComponent } from '../app/Components/add-exercise/add-exercise.component';
import { AllWorkoutsComponent } from '../app/Components/all-workouts/all-workouts.component';
import { LoginComponent } from '../app/Components/login/login.component';
import { WorkoutDetailsComponent } from '../app/Components/workout-details/workout-details.component';
import { CreateUserComponent } from '../app/Components/create-user/create-user.component';
import { AuthGuard } from '../app/Interceptors/authGuard';

const routes: Routes = [
  {path: 'addactivity', component: AddActivityComponent, canActivate: [AuthGuard]},
  {path: 'addexercise', component: AddExerciseComponent},
  {path: '', component: AllWorkoutsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'workoutdetail/:id', component: WorkoutDetailsComponent},
  {path: 'createuser', component: CreateUserComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
