import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { AlertifyService } from '../_service/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  pwdModel: any = {};
  
  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) {}

  ngOnInit() {}

  login() {
    console.log('asdf');
    this.authService.login(this.model).subscribe(x => {
      this.alertify.success('logged in successfully');
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/home']);
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    this.authService.userToken = null;
    this.authService.currentUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }

  changePwd() {
    this.authService.changePwd(this.pwdModel).subscribe(x => {
      this.alertify.success('change successfully');
    }, error => {
      if (error) {
        this.alertify.error(error);
      } else {
        this.alertify.error('failed');
      }
    });
  }

}
