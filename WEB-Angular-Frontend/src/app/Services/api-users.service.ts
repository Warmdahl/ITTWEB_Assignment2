import { Injectable } from '@angular/core';
import { User } from '../Interfaces/user';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
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
  private baseUserUrl = 'http://localhost:8080'

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};

  //Method to get a list of all users in the DB
  getUsers(): Observable<User[]> {
    const usersUrl = `${this.baseUserUrl}/users/getusers`
    return this.http.get<User[]>(usersUrl).pipe(catchError(this.handleError<User[]>('getUsers', )));
  }

  //Method to add new user to DB
  addUser(username: string, password: string) {
    this.http.post<any>(`${this.baseUserUrl}/users/adduser`, {username, password})
      .subscribe(data => {window.localStorage.setItem('Token', data);
      return true;
    },
    //Errors will call this callback instead
    (err : HttpErrorResponse) => {
      if(err.error instanceof Error) {
        // A client-side or network occurred. Handle it accordingly.
        console.log('An error occured: ', err.error.message);
      } else {
        // The backend returned an unsuccseful response code.
        // The respose boby may contain clues as to what went wrong.
        console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
      }
      return false;
    });
  }

  //Method to get all activities for one user and a specific workout
  getActivitiesUserWok(username: String, id: String) {
    return this.http.post<any>(`${this.baseUserUrl}/users/getactivitiesuserwok`, {username, id});
  }

  //Method to post a activity to a user and a specific workout
  postActivityUserWok(username: String, workoutId: String, actDescription: String) {
    var actDate = Date().toString();
    //let actDate: Date = new Date();
    console.log("postacivity?")
    console.log(actDate)
    //console.log(aDate)
    return this.http.post<any>(`${this.baseUserUrl}/users/addactivity`, {username, actDate, actDescription, workoutId})
      .subscribe(response => (console.log(response)))
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
