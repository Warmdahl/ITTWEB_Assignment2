import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from '../../Interfaces/user';
import { ApiUsersService } from '../../Services/api-users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators'

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
    private userService: ApiUsersService,
    private location: Location,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  users: User[]; //<---- Array of users, internal use
  loginUser: User;

  //get function of all users in the DB - just used to check
  getUsers(): void {
    this.userService.getUsers().subscribe(response => this.users = response)
  }

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

  ngOnInit() {
    this.getUsers(); //felt cute, might delete later

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}
