import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Workout} from '../Interfaces/workout';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiWorkoutService {

  private apiurl = 'http://localhost:8080/workouts'
  //private apiurl = 'https://backend-express-assignment2.herokuapp.com/workouts/workoutlist'
  constructor(
    private http: HttpClient
  ) { }

  getWorkoutList(): Observable<Workout[]> {
    return this.http.get<any>(this.apiurl+"/workoutlist")
    .pipe(
      tap(_ => console.log("WorkoutList fetched")),
      catchError(this.handleError<Workout[]>('getWorkoutList', []))
    );
  }

  createWorkout(workout: Workout): Observable<Workout> {
    return this.http.post<Workout>(this.apiurl+"/createworkout", workout, this.httpOptions)
    .pipe(
      
      catchError(this.handleError<Workout>('createWorkout'))
    );
  }
  
  getWorkout(id: String): Observable<Workout> {
    
    return this.http.get<Workout>(this.apiurl+"/showexcinwok/"+id)
    .pipe(
      catchError(this.handleError<Workout>('getWorkout'))
    )
  }

  addExercise(name: String, description: String, numberSets: Number, timeRep: Number, id: String): void{
    this.http.post<any>(this.apiurl+'/createExersice'+id, {
      "name": name,
      "description": description,
      "Numbersets": numberSets,
      "timereps": timeRep 
    })
    .pipe(
      catchError(this.handleError<any>('createxercise'))
    )
  }

  httpOptions = {
    headers: new HttpHeaders({'contentType': 'application/json'})
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //console.error(error);

      //console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  }
}
