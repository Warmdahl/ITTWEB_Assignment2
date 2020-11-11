import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-all-workouts',
  templateUrl: './all-workouts.component.html',
  styleUrls: ['./all-workouts.component.css']
})
export class AllWorkoutsComponent implements OnInit {
  apiurl = "http://localhost:8080/workouts/workoutlist"
  workoutList=[]
  constructor() { }

  ngOnInit(): void {
    
  }

}
