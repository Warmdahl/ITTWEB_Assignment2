import { Injectable } from '@angular/core';
import { User } from '../Interfaces/user';
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
  private baseUserUrl = 'http://localhost:8080/'

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};

  getUsers(): Observable<User[]> {
    const usersUrl = `${this.baseUserUrl}users/getusers`
    return this.http.get<User[]>(usersUrl).pipe(catchError(this.handleError<User[]>('getUsers', )));
  }

  login(user: User): Observable<User> {
    //loginuser = new user{};
    //const loginUrl = `${this.baseUserUrl}users/userlogin/${loginuser}`;
    
    return null;
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
