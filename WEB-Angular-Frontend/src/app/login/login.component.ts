import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from '../Interfaces/user';
import { ApiUsersService } from '../api-users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: ApiUsersService,
    private location: Location
  ) { }

  users: User[]; //<---- Array of users, internal use

  //Get function to see all users in the system
  /*getUsers(): void {
    this.userService.getUsers().subscribe(response => this.users = response.users)
  }*/

  getUsers(): void {
    this.userService.getUsers().subscribe(response => this.users = response)
  }

  //What happens when cancel btn is pressed
  goBack(): void {
    this.location.back();
  }

  //What happens when login btn is pressed
  login(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.getUsers(); //felt cute, might delete later
  }

}
