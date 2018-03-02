import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
// import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { User } from '../_model/User';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthUser } from '../_model/authUser';

@Injectable()
export class AuthService {
  baseUrl = environment.apiUrl;
  userToken: any;
  decodeToken: any;
  currentUser: User;

  constructor(
    private http: HttpClient,
    private jwtHelpService: JwtHelperService
  ) {}

  login() {
    const headers = new HttpHeaders().set(
      'Authorization', 'Basic ' + btoa('jack' + ':' + 'password'));

    console.log( 'Basic ' + btoa('jack' + ':' + 'password'));
    return (
      this.http
        .post<AuthUser>(this.baseUrl + '/user/login', {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        })
        // .map((response: Response) => {
        //   const user = response.json();
        .map(user => {
          console.log(user);
          //   if (user) {
          //     localStorage.setItem('token', user.tokenString);
          //     localStorage.setItem('username', user.username);
          //     localStorage.setItem('role', user.role);

          //     this.decodeToken = this.jwtHelpService.decodeToken(
          //       user.tokenString
          //     );
          //     this.userToken = user.tokenString;
          //   }
        })
        .catch(this.handlerError)
    );
  }

  loggedIn() {
    // return tokenNotExpired('token');
    const token = this.jwtHelpService.tokenGetter();

    if (!token) {
      return false;
    }

    return !this.jwtHelpService.isTokenExpired(token);
  }

  private handlerError(error: any) {
    const applicationError = error.headers.get('Application-Error');
    if (applicationError) {
      return Observable.throw(applicationError);
    }

    const serverError = error.json();
    let modelStateErrors = '';
    if (serverError) {
      for (const key in serverError) {
        if (serverError[key]) {
          modelStateErrors += serverError[key] + '\n';
        }
      }
    }
    return Observable.throw(modelStateErrors || 'Server error');
  }
}
