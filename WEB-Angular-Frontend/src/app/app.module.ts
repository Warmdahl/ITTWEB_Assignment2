import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; //NgModels
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; //HTTP
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { AllWorkoutsComponent } from './Components/all-workouts/all-workouts.component';
import { WorkoutDetailsComponent } from './Components/workout-details/workout-details.component';
import { AddExerciseComponent } from './Components/add-exercise/add-exercise.component';
import { AddActivityComponent } from './Components/add-activity/add-activity.component';
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor } from './Interceptors/JWT.interceptor';
import { CreateUserComponent } from './Components/create-user/create-user.component'
import { DemoMaterialModule} from './material-modules';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogbarComponent } from './Components/logbar/logbar.component'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AllWorkoutsComponent,
    WorkoutDetailsComponent,
    AddExerciseComponent,
    AddActivityComponent,
    CreateUserComponent,
    LogbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    BrowserAnimationsModule,
    
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
