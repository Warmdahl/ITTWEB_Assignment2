import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ApiUsersService } from '../../Services/api-users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  createUserForm: FormGroup;
  submitted = false;

  constructor(
    private userService: ApiUsersService,
    private location: Location,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createUserForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  //Method for cancel createuser
  goBack(): void {
    this.location.back();
  }

  //easier access to form values
  get f() {return this.createUserForm.controls;}

  goCreate(): void {
    this.submitted = true;

    // stop here if form is invalid
    if(this.createUserForm.invalid) {
      return;
    }

    this.userService.addUser(this.f.username.value, this.f.password.value)  
    this.router.navigate(['']);
  }

}
