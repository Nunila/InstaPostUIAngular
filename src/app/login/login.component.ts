import { Component, OnInit } from '@angular/core';
import {DatePipe} from '@angular/common';
import {Router, ActivatedRoute} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';

import {UserService} from '../services/user.service';

interface NewAccount {
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNum: number;
  email: string;
  birthday: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  unameLog = new FormControl('', [Validators.required]);
  passwdLog = new FormControl('', [Validators.required]);
  unameSign = new FormControl('', [Validators.required]);
  passwdSign = new FormControl('', [Validators.required]);
  newUser: NewAccount;
  private logUser;
  accntInf: NewAccount;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private datePipe: DatePipe,
  ) {}

  ngOnInit() {
    this.logUser = {
      userName: '',
      password: ''
    };
    this.newUser = {
      userName: '',
      password: '',
      firstName: '',
      lastName: '',
      birthday: '',
      phoneNum: 0,
      email: ''
    };
  }
  // for convenient field access in forms
  lf() {return this.logUser; }
  sf() {return this.newUser; }
  // when logging in
  onLogSubmit() {
    this.userService.login(this.logUser);
  }

  onRegisterSubmit() {
    // this.accntInf.userName = this.newUser.userName;
    // this.accntInf.password = this.newUser.password;
    // this.accntInf.firstName = this.newUser.firstName;
    // this.accntInf.lastName = this.newUser.lastName;
    // this.accntInf.phoneNum = this.newUser.phoneNum;
    // this.accntInf.email = this.newUser.email;
    this.newUser.birthday = this.datePipe.transform(this.newUser.birthday, 'yyyy-MM-dd');
    console.log(this.newUser);
    this.userService.signup(this.newUser);
  }

}
