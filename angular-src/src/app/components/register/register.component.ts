import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private validateService: ValidateService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }


  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    };

    if(!this.validateService.validateRegister(user)) {
      alert('Please Fill in All Fields');
      return false;
    }

    if(!this.validateService.validateEmail(user.email)) {
      alert('Please Use a Valid Email');
      return false;
    }

    this.authService.checkUser(user.email).subscribe((data) => {
      if (data.success) {
        this.authService.registerUser(user).subscribe(data => {
          if(data.success) {
            alert('You are now registered.');
            //window.location.replace('/login');
            this.router.navigate(['/login']);
          } else {
            alert('Registration failed');
            this.router.navigate(['/register']);
          }
        })
      } else {
        alert('Email not on the approved list.');
      }
    });


  }



}
