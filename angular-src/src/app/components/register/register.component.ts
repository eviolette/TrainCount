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


  // Register button is clicked

  onRegisterSubmit() {
    // Create user based on form info
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    };

    // Checks if user entered all fields

    if(!this.validateService.validateRegister(user)) {
      alert('Please Fill in All Fields');
      return false;
    }
    // Checks if user entered a properly formatted email
    if(!this.validateService.validateEmail(user.email)) {
      alert('Please Use a Valid Email');
      return false;
    }

    // Calls the authService.checkUser based on email, will return false if the user exists, true if not
    // Also checks if the user is on the approved email list (Utilities component)

    this.authService.checkUser(user.email).subscribe((data) => {
      if (data.success) {
        // Registers user with a POST request
        this.authService.registerUser(user).subscribe(data => {
          if(data.success) {
            alert('You are now registered.');
            //window.location.replace('/login');
            this.router.navigate(['/login']);
          } else {
            // If somehow the post request fails

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
