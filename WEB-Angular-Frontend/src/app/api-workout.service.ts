import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Workout} from './Interfaces/workout';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiWorkoutService {

  private apiurl = 'http://localhost:8080/workouts/workoutlist'
  //private apiurl = 'https://backend-express-assignment2.herokuapp.com/workouts/workoutlist'
  constructor(
    private http: HttpClient
  ) { }

  getWorkoutList(): Observable<Workout[]> {
    return this.http.get<Workout[]>(this.apiurl)
    .pipe(
      tap(_ => console.log("WorkoutList fetched")),
      catchError(this.handleError<Workout[]>('getWorkoutList', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //console.error(error);

      //console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  }
}
