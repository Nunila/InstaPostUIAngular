import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';

interface User {
  userId: number;
  userName: string;
  password: string;
  personId: number;
}
export interface Person {
  firstName: string;
  lastName: string;
  phoneNum: number;
  email: string;
  birthday: string;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private mainUrl = `http://localhost:5000/InstaPost`;
  private currentUser: User;

  constructor(private http: HttpClient, private router: Router) { }

  public getCurrentUser() {
    return this.currentUser;
  }

  login(username: string, password: string) {
    const url =  this.mainUrl + `/users/login/` + username + '/' + password;
    const headersDict = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    };
    const requestOptions = {
      headers: new HttpHeaders(headersDict)
    };

    this.http.post(url, requestOptions)
      .subscribe(data => {
          const user = data as User;
          this.currentUser = user;
        },
        (err) => console.log(err),
        () => {
          console.log(this.currentUser);
          this.router.navigate(['/home']);
          // localStorage.setItem('currentUserId', JSON.stringify(this.currentUser.userId));
        }
      );
  }

  logout() {
    localStorage.removeItem('currentUserId');
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

  createUser(username: string, password: string) {
    return this.http.post(this.mainUrl + '/users', {username, password});
  }

  createPerson(person: Person) {
    return this.http.post(this.mainUrl + '/person', person);
  }
}
