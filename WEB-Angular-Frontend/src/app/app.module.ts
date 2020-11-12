import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; //NgModels
import {HttpClientModule} from '@angular/common/http' //More HTTP

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AllWorkoutsComponent } from './all-workouts/all-workouts.component';
import { WorkoutDetailsComponent } from './workout-details/workout-details.component';
import { AddExerciseComponent } from './add-exercise/add-exercise.component';
import { AddActivityComponent } from './add-activity/add-activity.component';

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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
