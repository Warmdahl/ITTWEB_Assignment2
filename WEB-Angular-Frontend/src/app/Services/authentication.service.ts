import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../Interfaces/user';

//Inspiration taken from: https://jasonwatmore.com/post/2019/06/10/angular-8-user-registration-and-login-example-tutorial 

@Injectable({providedIn: 'root'})

export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  private currentUser: Observable<User>
  private baseUserUrl = 'http://localhost:8080/'

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): User {
     return this.currentUserSubject.value;
   }

   login(username, password) {
     console.log("test")
     this.http.post<any>(`${this.baseUserUrl}users/userlogin`, {username, password})
      .subscribe(response => {this.saveToken(response);
      console.log("test2");
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

   logout(){
     //remove user from local storage and set current user to null
     localStorage.removeItem('Token');
     //this.currentUserSubject.next(null);
   }

   private saveToken(token: string) {
     //window.localStorage['Token'] = token;
     window.localStorage.setItem('Token',token)
   }

   public getToken() {
     if(window.localStorage.getItem('Token')) {
       return window.localStorage.getItem('Token');
     } else {
       return '';
     }
   }

   public isLoggedIn() {
     const token = this.getToken();
     if(token) {
       const payload = JSON.parse(window.atob(token.split('.')[1]));
       return payload.exp > Date.now() / 1000;
     } else {
       return false;
     }
   }


}
