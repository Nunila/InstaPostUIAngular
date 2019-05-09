import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {HomeService} from '../services/home.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private userService: UserService, private homeService: HomeService) { }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
    this.homeService.logout();
  }

}
