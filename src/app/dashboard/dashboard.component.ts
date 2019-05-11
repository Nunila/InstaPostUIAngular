import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../services/dashboard.service';
import {HomeService} from '../services/home.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dashboardService: DashboardService, private homeService: HomeService) { }

  ngOnInit() {
    if (this.dashboardService.chartData.length === 0)     this.dashboardService.getTrendingHashtags();
  }

  print() {
    console.log(this.dashboardService.mostActiveKeys);
  }



}
