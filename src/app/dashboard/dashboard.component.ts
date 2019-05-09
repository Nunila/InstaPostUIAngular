import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    if (this.dashboardService.chartData.length === 0)     this.dashboardService.getTrendingHashtags();
  }

  print() {
    console.log(this.dashboardService.mostActiveKeys);
  }



}
