import { Component, OnInit } from '@angular/core';

import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {UserService, Person} from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  signUpForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  private person;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ) {// go in if user logged in already
    if (localStorage.getItem('currentUserId') != null) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.signUpForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: [''],
      lastName: [''],
      phoneNum: [''],
      email: [''],
      birthday: ['']
    });
  }
  // for convenient field access in forms
  get lf() {return this.loginForm.controls; }
  get sf() {return this.signUpForm.controls; }
  // when logging in
  onLogSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.userService.login(this.lf.username.value, this.lf.password.value);
    if (this.userService.getCurrentUserId() >= 1) {
      this.router.navigate(['/home']);
    }
  }
  onRegisterSubmit() {
    this.submitted = true;
    if (this.signUpForm.invalid) {
      return;
    }
    this.userService.createUser(this.sf.username.value, this.sf.password.value);
    this.userService.getUserbyUname(this.sf.username.value);
    this.person.userId = this.userService.getCurrentUserId();
    this.person.firstName = this.sf.firstName.value;
    this.person.lastName = this.sf.lastName.value;
    this.person.phoneNum = this.sf.phoneNum.value;
    this.person.email = this.sf.email.value;
    this.person.birthday = this.sf.birthday.value;
    this.userService.createPerson(this.person);
    this.router.navigate(['/home']);
  }

}
