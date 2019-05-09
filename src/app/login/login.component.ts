import { Component, OnInit } from '@angular/core';
import {DatePipe} from '@angular/common';
import {Router, ActivatedRoute} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {User, Person, Credentials, NewUser} from '../services/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [DatePipe]
})
export class LoginComponent implements OnInit {
  unameLog = new FormControl('', [Validators.required]);
  passwdLog = new FormControl('', [Validators.required]);
  unameSign = new FormControl('', [Validators.required]);
  passwdSign = new FormControl('', [Validators.required]);
  loading = false;
  submitted = false;
  returnUrl: string;

  private person;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private datePipe: DatePipe
  ) {// go in if user logged in already
    if (localStorage.getItem('currentUserId') != null) {
      this.router.navigate(['/home']);
    }
  }

  private newUser;
  private logUser;

  ngOnInit() {
    this.logUser = {
      username: '',
      password: ''
    };
    this.newUser = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      birthday: '',
      phonenumber: '',
      email: ''
    };
  }
  // for convenient field access in forms
  lf() {return this.logUser; }
  sf() {return this.newUser; }
  // when logging in
  getUnameLogErr() {
    return this.unameLog.hasError('required') ? 'You must enter a value.' : '';
  }
  getPwdLogErr() {
    return this.passwdLog.hasError('required') ? 'You must enter a value.' : '';
  }
  getUnameSignErr() {
    return this.unameSign.hasError('required') ? 'You must enter a value.' : '';
  }
  getPwdSignErr() {
    return this.passwdSign.hasError('required') ? 'You must enter a value.' : '';
  }
  onLogSubmit() {
    console.log('Login');
    this.submitted = true;
    this.loading = true;
    this.userService.login(this.lf().username, this.lf().password);
  }

  onRegisterSubmit() {
    this.submitted = true;
    this.userService.createUser(this.sf().username, this.sf().password);
    this.userService.getUserbyUname(this.sf().username);
    this.person.userId = this.userService.getCurrentUser().userId;
    this.person.firstName = this.sf().firstName;
    this.person.lastName = this.sf().lastName;
    this.person.phoneNum = this.sf().phoneNum;
    this.person.email = this.sf().email;
    this.person.birthday = this.datePipe.transform(this.sf().birthday, 'MM/DD/yyyy');
    // this.userService.createPerson(this.person);
    this.router.navigate(['/home']);
  }

}
