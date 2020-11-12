import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; //NgModels
import { HttpClientModule } from '@angular/common/http'; //HTTP

import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { AllWorkoutsComponent } from './Components/all-workouts/all-workouts.component';
import { WorkoutDetailsComponent } from './Components/workout-details/workout-details.component';
import { AddExerciseComponent } from './Components/add-exercise/add-exercise.component';
import { AddActivityComponent } from './Components/add-activity/add-activity.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AllWorkoutsComponent,
    WorkoutDetailsComponent,
    AddExerciseComponent,
    AddActivityComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
