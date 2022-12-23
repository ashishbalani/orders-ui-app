import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { withRouterConfig } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document
    ) {}
    ngOnInit() {}

    loginWithRedirect() {
      this.auth.loginWithRedirect().subscribe(
        (token) => {
          console.log(''+token);
        }
      );

    }
  
    logout() {
      this.auth.logout({ returnTo: this.doc.location.origin });
    }
}
