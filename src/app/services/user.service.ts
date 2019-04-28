import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient, HttpResponse} from '@angular/common/http';

interface User {
  userId: number;
  username: string;
  password: string;
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
  mainUrl = `http://localhost:5000/InstaPost`;
  private currentUser: User;
  constructor(private http: HttpClient) { }
  public get getCurrentUserId(): number {
    return this.currentUser.userId;
  }
  login(username: string, password: string) {
    const url =  this.mainUrl + `/user/login/` + username + '/' + password;
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
          localStorage.setItem('currentUserId', JSON.stringify(user.userId));
        },
        (err) => console.log(err),
        () => {
          console.log(this.currentUser);
        }
      );
  }
  logout() {
    localStorage.removeItem('currentUserId');
    this.currentUser = null;
  }
  getUserbyUname(username: string) {
    const url =  this.mainUrl + `/user/` + username;
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
