import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
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


  // User Registration Methods
  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
      .map(res=>res.json());
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user,{headers: headers})
      .map(res => res.json());
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/users/profile',{headers: headers})
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
    return this.http.post('http://localhost:3000/lines/register', line, {headers: headers})
      .map(res=>res.json());
  }

  getLine() {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/lines/lineInfo',{headers: headers})
      .map(res => res.json());
  }

  // Count Methods
  getDeptInfo(lineNum) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let params: URLSearchParams = new URLSearchParams();
    params.set('line', lineNum);
    let options = new RequestOptions();
    options.search = params;
    return this.http.get('http://localhost:3000/counts/departures/' + lineNum, {headers: headers})
      .map(res => res.json());
  }

  getStationInfo(lineNum) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/counts/stations/' + lineNum, {headers: headers})
      .map(res => res.json());
  }

  getStationKey(station) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/newcounts/stationtime/' + station, {headers: headers})
      .map(res => res.json());
  }

  updateCount(count) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/newcounts/updatecount', count, {headers: headers})
      .map(res=>res.json());
  }


  // Export Methods

  exportCounts() {
    let headers = new Headers();
    return this.http.get('http://localhost:3000/newcounts/exportcount', {headers: headers})
  }

}
