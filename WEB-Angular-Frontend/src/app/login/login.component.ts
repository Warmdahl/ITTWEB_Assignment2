import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private location: Location
  ) { }

  superman = 'Alexander';

  //What happens when cancel btn is pressed
  goBack(): void {
    this.location.back();
  }

  //What happens when login btn is pressed
  login(): void {
    this.location.back();
  }

  ngOnInit(): void {
  }

}
