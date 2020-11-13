import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthenticationService } from '../../Services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loggedIn = false;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  //What happens when cancel btn is pressed
  goBack(): void {
    this.location.back();
  }

  get f() {return this.loginForm.controls; }

  //What happens when login btn is pressed
  login(): void {
    this.submitted = true;

    // stop here if form is invalid
    if(this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.f.username.value, this.f.password.value)  
    this.router.navigate(['']);
  }

  //Method for logout
  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }

  //Method to route to createuser
  createUser(): void {
    this.loggedIn = this.authService.isLoggedIn();
    //If a user is logged in, redirect to front page
    if(this.loggedIn == true){
      this.router.navigate([''])
    }
    //If no user logged in, redirect to create user
    else{
      this.router.navigate(['/createuser'])
    }
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}
