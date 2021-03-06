import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private authService: AuthService,
              private router: Router){}

  // Guard that always returns true if the user is logged in, else otherwise.

  canActivate() {
    if(this.authService.loggedIn()) {
      return true;
    } else {
      this.router.navigate['/login'];
      //alert('NAH BOI');
      return false;
    }
  }
}

