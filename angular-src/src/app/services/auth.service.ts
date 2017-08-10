import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
//import {Observable} from "rxjs/Observable";
import {Observable} from "rxjs/Rx";
//import {RequestOptions} from "http";

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  line: any;
  isDev: boolean;
  lineNum: any;
  rows: any;

  constructor(private  http:Http) {
    this.isDev = false;
  }


  // AUTH SERVICE: PERFORMS ALL HTTP REQUESTS TO ROUTES, WHICH THEN QUERY DATABASE COLLECTIONS. AUTHSERVICE MAPS ROUTE
  // RESPONSES TO JSON OBJECTS, THEN RETURNS THEM TO THE ANGULAR COMPONENTS THAT CALL THE AUTHSERVICE METHOD TO BEGIN
  // WITH



  // User Registration Methods

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('users/register', user, {headers: headers})
      .map(res=>res.json());
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('users/authenticate', user,{headers: headers})
      .map(res => res.json());
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('users/profile',{headers: headers})
      .map(res => res.json());
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  // Line Registration Methods
  registerLine(line) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('lines/register', line, {headers: headers})
      .map(res=>res.json());
  }


  // Count Methods
  getDeptInfo(lineNum) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let params: URLSearchParams = new URLSearchParams();
    params.set('line', lineNum);
    let options = new RequestOptions();
    options.search = params;
    return this.http.get('counts/departures/' + lineNum, {headers: headers})
      .map(res => res.json())
      .catch((err) => {
        console.log(err);
        return Observable.throw(err);
      })
  }

  getStationInfo(lineNum) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('counts/stations/' + lineNum, {headers: headers})
      .map(res => res.json())
      .catch((err) => {
        console.log(err);
        return Observable.throw(err);
      })
  }

  findTrainCoach(coach) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('newcounts/trainexists/' + coach, {headers: headers})
      .map(res => res.json());
  }

  getOnOffCounts(indexStation) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('newcounts/onoffs/' + indexStation, {headers: headers})
      .map(res => res.json());
  }


  updateCount(count) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('newcounts/updatecount', count, {headers: headers})
      .map(res=>res.json());
  }

  // Train Methods (For Number of Cars)

  checkNumberOfCars(index) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('trains/getnumberofcars/' + index, {headers: headers})
      .map(res => res.json());
  };

  // Username Methods

  isAdmin(username) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('usernames/isadmin/' + username, {headers: headers})
      .map(res => res.json());
  }

  checkUser(email) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('usernames/approvedemail/' + email, {headers: headers})
      .map(res => res.json());
  }


  // Export Methods

  exportCounts() {
    let headers = new Headers();
    return this.http.get('newcounts/exportcount', {headers: headers})
  }

}
