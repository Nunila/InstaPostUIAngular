import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient) { }

  title = 'UIInstaPost';
  mainUrl = `http://localhost:5000/InstaPost`;

  test() {
    const url =  this.mainUrl + `/chats`;
    const headersDict = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    };
    const requestOptions = {
      headers: new HttpHeaders(headersDict)
    };
    this.http.get(url, requestOptions)
      .subscribe(data => {
      console.log(data);
      this.title = data.toString();
    });
  }
}
