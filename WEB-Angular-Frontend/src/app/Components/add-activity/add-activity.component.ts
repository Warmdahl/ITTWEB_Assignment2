import { Component, OnInit } from '@angular/core';
import { ApiUsersService } from 'src/app/Services/api-users.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})

export class AddActivityComponent implements OnInit {
  activityForm: FormGroup;
  submitted = false;

  constructor(
    private userService: ApiUsersService,
    private location: Location,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.activityForm = this.formBuilder.group({
      actDescription: ['', Validators.required]
    })
  }

  //easier access to formgroup controls values
  get f() {return this.activityForm.controls;}

  goSubmit(): void {
    this.submitted = true;

    //stop here if form is invalid
    if(this.activityForm.invalid){
      return;
    }

    //Getting workout id from url
    const workoutId: String = this.route.snapshot.paramMap.get('id').toString()

    //Getting username from token in localstorage (user logged in)
    const username = this.authService.UserNameFromToken();

    this.userService.postActivityUserWok(username, workoutId, this.f.actDescription.value);
    //this.location.back();
  }

  //Method for go back btn
  goBack(): void {
    this.location.back();
  }

}
