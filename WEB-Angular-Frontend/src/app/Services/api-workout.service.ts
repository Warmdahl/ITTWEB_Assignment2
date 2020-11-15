import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Workout} from '../Interfaces/workout';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiWorkoutService {

  //private apiurl = 'http://localhost:8080/workouts';
   private apiurl = 'https://backend-express-assignment2.herokuapp.com/workouts'
  constructor(
    private http: HttpClient
  ) { }

  getWorkoutList(): Observable<Workout[]> {
    return this.http.get<any>(this.apiurl + "/workoutlist")
    .pipe(
      tap(_ => console.log("WorkoutList fetched")),
      catchError(this.handleError<Workout[]>('getWorkoutList', []))
    );
  }

  createWorkout(name: String) {
    console.log(name);
    this.http.post<any>(`${this.apiurl}/createworkout`, {name})
    .subscribe(response => console.log(response));
  }

  getWorkout(id: String): Observable<Workout> {

    return this.http.get<Workout>(this.apiurl + "/showexcinwok/" + id)
    .pipe(
      catchError(this.handleError<Workout>('getWorkout'))
    );
  }

  addExercise(name, description, numbersets, timerep, id){
    this.http.post<any>(this.apiurl + "/createexercise/" + id, {name, description, numbersets, timerep})
    .subscribe(response => {console.log(response); });
  }


  /*addExercise(name, description, numbersets, timerep, id){
    console.log("I am here")
    this.http.post<any>(this.apiurl+'/createexercise/'+id.toString(), {
      name,
      description,
      numbersets,
      timerep
    })
    return this.http.get<any>(`${this.apiurl}/showexcinwok/${id}`)
    //.pipe(catchError(this.handleError<any>('createxercise')))
    //return null;
  }*/

  httpOptions = {
    headers: new HttpHeaders({'contentType': 'application/json'})
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);

      // console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
