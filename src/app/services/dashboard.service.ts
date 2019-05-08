import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public selectedStatistic = 'trending#';
  constructor() { }
}
