import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from '../Interfaces/user';
import { ApiUsersService } from '../Services/api-users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: ApiUsersService,
    private location: Location,
    private route: ActivatedRoute
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

  //What happens when login btn is pressed
  login(username: string, password: string): void {
    username = username.trim();
    if(!username) {return; }

    this.loginUser.username = username;
    this.loginUser.password = password;

    //this.userService.login(this.loginUser).subscribe(response => {this.users.push(this.loginUser)});
    this.location.back();
  }

  ngOnInit(): void {
    this.getUsers(); //felt cute, might delete later
  }

}
