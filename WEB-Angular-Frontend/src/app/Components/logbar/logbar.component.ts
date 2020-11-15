import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logbar',
  templateUrl: './logbar.component.html',
  styleUrls: ['./logbar.component.css']
})
export class LogbarComponent implements OnInit {
  loggedin = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn();
  }

  isLoggedIn(){
    if (this.authenticationService.isLoggedIn()){
      this.loggedin = true;
    }else{
      this.loggedin = false;
    }
  }

  login(): void {
    this.router.navigate(['/login']);
    this.isLoggedIn();
  }

  // Method for logout
  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['']);
    this.isLoggedIn();
  }

}
