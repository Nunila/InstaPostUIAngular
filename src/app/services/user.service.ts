import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

interface User {
  userId: number;
  userName: string;
  personId: number;
  firstName: string;
  lastName: string;
  phoneNum: number;
  email: string;
  birthday: string;
}
// interface NewAccount {
//   userName: string;
//   password: string;
//   firstName: string;
//   lastName: string;
//   phoneNum: number;
//   email: string;
//   birthday: string;
// }

interface Credentials {
  userName: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private mainUrl = `http://localhost:5000/InstaPost`;
  private currentUser: User;

  private credentials: Credentials;

  constructor(private http: HttpClient, private router: Router) {}

  public getCurrentUser() {
    return this.currentUser;
  }

  public getCurrentUserId() {
    return this.currentUser.userId;
  }

  login(username, password) {
    // const credentials = {userName, password};
    const url =  this.mainUrl + `/users/login/` + username + '/' + password;
    const headersDict = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    };
    const requestOptions = {
      headers: new HttpHeaders(headersDict)
    };
    // tslint:disable-next-line:no-unused-expression
    this.http.post(url, requestOptions)
      .subscribe(data => {
          const user = data as User;
          this.currentUser = user;
        },
        (err) => {
          console.log(err);
          Swal.fire({
            title: 'Invalid credentials.',
            text: 'Username/password might be wrong.',
            type: 'error',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok!'
          });
        },
        () => {
          console.log(this.currentUser);
          return this.router.navigate(['/home']);
        }
      );
  }

  logout() {
    this.currentUser = null;
  }

  getUserbyUname(username: string) {
    const url =  this.mainUrl + `/users/` + username;
    const headersDict = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    };
    const requestOptions = {
      headers: new HttpHeaders(headersDict)
    };
    this.http.get(url, requestOptions)
      .subscribe(data => {
        const user = data as User;
        this.currentUser = user;
      });
  }

  signup(userAccount) {
    const url =  this.mainUrl + '/users/signup';
    const headersDict = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    };
    const requestOptions = {
      headers: new HttpHeaders(headersDict)
    };
    this.http.post(url, userAccount)
      .subscribe(data => {
          const user = data as User;
          this.currentUser = user;
        },
        (err) => {
          console.log(err);
          Swal.fire({
            title: 'Username, email or phone number already taken.',
            text: 'You may have to change one or more values.',
            type: 'error',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok!'
          });
        },
        () => {
          console.log(this.currentUser);
          return this.router.navigate(['/home']);
        }
      );
  }
}
