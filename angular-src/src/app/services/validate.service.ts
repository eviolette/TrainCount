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

  // Check if email is formatted correctly

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }


 // http request to newcounts route's lineexists method, checks if trainnumber exists

  checkTrainNumber(linePair) {
    //console.log('Bout to check');
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('newcounts/lineexists/' + linePair, {headers: headers})
      .map(res => res.json());
  }

  // Checks counter id

  checkCounterId(counter) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('counters/checkid/' + counter, {headers: headers})
      .map(res => res.json());
  }

}
