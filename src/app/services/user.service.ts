import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {User, Person, Credentials, NewUser} from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private mainUrl = `http://localhost:5000/InstaPost`;
  private currentUser: User;

  private credentials: Credentials = {
    userName: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  public getCurrentUser() {
    return this.currentUser;
  }

  public getCurrentUserId() {
    return this.currentUser.userId;
  }

  login(username: string, password: string) {
    this.credentials.userName = username;
    this.credentials.password = password;
    const url =  this.mainUrl + `/users/login`;
    const headersDict = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    };
    const requestOptions = {
      headers: new HttpHeaders(headersDict)
    };
    this.http.post(url, this.credentials)
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

  /*
  NOTE: CREAR METODO PARA DEVOLVER INFORMACION DE PERSON PARA GUARDAR EN CURRENT USER
   */
  
  signup(userAccount: NewUser) {
    const url =  this.mainUrl + '/signup';
    const headersDict = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    };
    const requestOptions = {
      headers: new HttpHeaders(headersDict)
    };
    this.http.post(url, userAccount)
      .subscribe(data => {
          const userId = data as number;
          this.currentUser.userId = userId;
        },
        (err) => console.log(err),
        () => {
          console.log(this.currentUser.userId);
          this.router.navigate(['/home']);
          // localStorage.setItem('currentUserId', JSON.stringify(this.currentUser.userId));
        }
      );
  }
}
