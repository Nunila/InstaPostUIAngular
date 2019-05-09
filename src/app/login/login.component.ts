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
  private newUser;
  private logUser;
  private accntInf: NewAccount;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private datePipe: DatePipe,
  ) {}

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
      phoneNum: '',
      email: ''
    };
  }
  // for convenient field access in forms
  lf() {return this.logUser; }
  sf() {return this.newUser; }
  // when logging in
  onLogSubmit() {
    this.userService.login(this.lf().username, this.lf().password);
  }

  onRegisterSubmit() {
    this.accntInf.userName = this.sf().username;
    this.accntInf.password = this.sf().password;
    this.accntInf.firstName = this.sf().firstName;
    this.accntInf.lastName = this.sf().lastName;
    this.accntInf.phoneNum = this.sf().phoneNum;
    this.accntInf.email = this.sf().email;
    this.accntInf.birthday = this.datePipe.transform(this.sf().birthday, 'yyyy-MM-dd');
    this.userService.signup(this.accntInf);
  }

}
