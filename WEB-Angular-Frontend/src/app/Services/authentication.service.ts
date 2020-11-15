import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({providedIn: 'root'})

export class AuthenticationService {
  private baseUserUrl = 'https://backend-express-assignment2.herokuapp.com/';


  constructor(
    private http: HttpClient,
  ) { }

  // Login method
    login(username, password) {
     console.log("test");
     this.http.post<any>(this.baseUserUrl+"users/userlogin", {username, password})
      .subscribe(response => {this.saveToken(response);
      console.log("test2");
      return true;
    },
      // Errors will call this callback instead
    (err : HttpErrorResponse) => {
      if (err.error instanceof Error) {
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

   // Logout the user
   logout(){
     // remove current token from local storage
     localStorage.removeItem('Token');
   }

   // Method for saving the JWT token in localstorage
   private saveToken(token: string) {
     window.localStorage.setItem('Token', token);
   }

   // Method for retrieving the JWT token from localstorage
   public getToken() {
     if (window.localStorage.getItem('Token')) {
       return window.localStorage.getItem('Token');
     } else {
       return '';
     }
   }

   // Method to check if there is a JWT present in LocalStorage ie. a user is logged in
   public isLoggedIn() {
     const token = this.getToken();
     if (token) {
       const payload = JSON.parse(window.atob(token.split('.')[1]));
       return payload.exp > Date.now() / 1000;
     } else {
       return false;
     }
   }

   // Find Username from token
   public UserNameFromToken() {
     const token = this.getToken();
     if (token){
       const payload = JSON.parse(window.atob(token.split('.')[1]));
       return payload.username;
     } else {
       return false;
     }
   }
}
