import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiWorkoutService } from 'src/app/Services/api-workout.service';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.css']
})
export class AddExerciseComponent implements OnInit {

  name: String
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private workoutService: ApiWorkoutService
  ) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get('name').toString()
  }

  cancel(): void {
    this.location.back();
  }

  addExerciseToWorkout(Name: String, Description: String, NumberSets: Number, TimeRep: Number): void {
    this.workoutService.addExercise(Name, Description, NumberSets, TimeRep, this.name)
    
    //this.router.navigate(['workoutdetail/'+this.tempWorkout._id])})
  }

}
