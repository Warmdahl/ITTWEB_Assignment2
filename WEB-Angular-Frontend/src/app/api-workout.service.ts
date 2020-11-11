import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiWorkoutService {

  constructor() { }

  getWorkoutList(){
    /*fetch(this.apiurl, {
      method: 'GET',
      headers: new Headers({
        'content-Type': 'application/json'
      })
    }).then(res => this.workoutList = res.json())*/
  }
}
