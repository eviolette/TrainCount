import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, RequestOptions, Response } from '@angular/http';

@Injectable()
export class ValidateService {

  constructor(private http: Http) { }

  validateRegister(user) {
    if (user.name == undefined || user.email == undefined || user.username == undefined || user.password == undefined) {
      return false;
    }
    else {
      return true;
    }
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validateLine(line) {
    const linePair = line.train_line + "_" + line.train_num;

    if (typeof line.date == "undefined") {
      alert('Enter a Date');
      return false;
    }
    if (typeof line.counter_id != "number") {
      alert('Use a valid number for the Counter Id');
      return false;
    }
    if (typeof line.num_cars != "number") {
      alert('Use a valid number for the Number of Cars');
      return false;
    }
    if (line.num_cars <= 0 || line.num_cars > 13) {
      alert('Number of cars should be between 1 and 13');
      return false;
    }
    if (typeof line.serial_num != 'number') {
      alert('Use a valid number for the Car Serial Number');
      return false;
    }
    if (typeof line.dept_time == "undefined") {
      alert('Enter a Departure Time');
      return false;
    }
    if (typeof line.arrival_time == "undefined") {
      alert('Enter an Arrival Time');
      return false;
    }
    if (typeof  line.assigned_car != 'number' || line.assigned_car < 1 || line.assigned_car > 13) {
      alert('Assigned Car must be a number, between 1 and 13');
      return false;
    }
    /*
    this.checkTrainNumber(linePair).subscribe(data => {
      if (!data.success) {
        alert('Train Line and Train Number Combination Not Found');
        return false;
      } else {
        alert('returning true');
        return true;
      }
      */
    return true;

  }


  checkTrainNumber(linePair) {
    console.log('Bout to check');
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/newcounts/trainexists/' + linePair, {headers: headers})
      .map(res => res.json());
  }

}
