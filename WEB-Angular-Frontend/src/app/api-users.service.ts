import { Injectable } from '@angular/core';
import { User } from './Interfaces/user';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiUsersService {

  //***************************************//
  // Calling from the local host atm
  // Change to Heroku call later
  // When API is installed on Heroku
  //***************************************//
  //private baseUserUrl = 'https://backend-express-assignment2.herokuapp.com/'
  private baseUserUrl = 'http://localhost:8080/'
  //private baseUserUrl = 'https://localhost:8080/'

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};

  /*
  getUsers(): Observable<{users: User[]}> {
    const usersUrl = `${this.baseUserUrl}users/getusers`
    return this.http.get<{ users: User[] }>(usersUrl).pipe(catchError(this.handleError<{users: User[]}>('getUsers', )));
  }*/

  getUsers(): Observable<User[]> {
    const usersUrl = `${this.baseUserUrl}users/getusers`
    return this.http.get<User[]>(usersUrl).pipe(catchError(this.handleError<User[]>('getUsers', )));
  }

  //Handle Error function
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Log to console
      console.error(error);

      //Let the app keep running by returning an empty result
      return of(result as T);
    }
  }


  constructor(
    private http: HttpClient
  ) { }

  
}
