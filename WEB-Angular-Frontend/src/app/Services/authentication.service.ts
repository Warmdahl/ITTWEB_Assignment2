import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
     return this.http.post<any>(`${this.baseUserUrl}users/userlogin`, {username, password})
      .pipe(map(user => {
        //store user details and jwt in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
   }

   logout(){
     //remove user from local storage and set current user to null
     localStorage.removeItem('currentUser');
     this.currentUserSubject.next(null);
   }
}
