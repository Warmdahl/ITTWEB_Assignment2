import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiWorkoutService } from 'src/app/Services/api-workout.service';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.css']
})
export class AddExerciseComponent implements OnInit {
  addExerciseForm: FormGroup;
  id: String;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private workoutService: ApiWorkoutService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id').toString();
    this.addExerciseForm = this.formBuilder.group({
      ExName: ['', [Validators.required]],
      ExDescription: ['', [Validators.required]],
      ExNumSets: ['', [Validators.required]],
      ExTimeRep: ['', [Validators.required]]
    });
  }

  get f(){
    return this.addExerciseForm.controls;
  }

  cancel(): void {
    this.location.back();
  }

  addExerciseToWorkout(): void {
    if (this.addExerciseForm.invalid){
      return;
    }

    this.workoutService.addExercise(this.f.ExName.value, this.f.ExDescription.value, this.f.ExNumSets.value, this.f.ExTimeRep.value, this.id);
    this.location.back();
  }

}
