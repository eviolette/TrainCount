import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }
  // Submit Button Clicked

  onLoginSubmit(){
    // Sets up user and password based on entered fields
    const user = {
      username: this.username,
      password: this.password
    };

    // Calls authService.authenticateUser with the user to query the users database. If success, navigate to home and
    // store a login token for a couple hours, if not, reroute and notify user

    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        //alert('Logged in');
        this.router.navigate(['/home']);
      } else {
        alert('Incorrect Password');
        this.router.navigate(['/login'])
      }
    });
  }

}
