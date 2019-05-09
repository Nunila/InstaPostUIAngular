import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {Hashtag, PostPerDay} from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public selectedStatistic = 'trending#';

  private trendingHashtags: Hashtag[] = new Array();
  public postsPerDay: PostPerDay[] = new Array();
  public repliesPerDay: PostPerDay[] = new Array();
  public likesPerDay: PostPerDay[] = new Array();
  public dislikesPerDay: PostPerDay[] = new Array();

  public chartData = [];
  public columnNames;

  // mainUrl = `https://instapostdb.herokuapp.com/InstaPost`;
  mainUrl = `http://localhost:5000/InstaPost`;

  constructor(private http: HttpClient) { }

  getSelectedStat() {
    switch  (this.selectedStatistic) {
      case 'trending#': {
        this.getTrendingHashtags();
        break;
      }
      case 'postsPerDay': {
        this.getNumberPostsPerDay();
        break;
      }
      case 'dislikesPost': {
        break;
      }
      case 'repliesPost': {
        break;
      }
      case 'activeuser': {
        break;
      }
      case 'postUser': {
        break;
      }
      case 'dislikesPerDay': {
        this.getDislikesPerDay();
        break;
      }
      case 'likesPost': {
        break;
      }
      case 'likesPerDay': {
        this.getLikesPerDay();
        break;
      }
      case 'repliesPerDay': {
        this.getNumberRepliesPerDay();
        break;
      }
      default: {
        break;
      }
    }
  }

  getTrendingHashtags() {
    const url =  this.mainUrl + `/hashtags/trending`;
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
        this.trendingHashtags = data as Hashtag[];
        },
        (err) => console.log(err),
        () => {
          this.trendingHashtags.forEach(hash => {
            this.chartData.push([hash.hashtag, hash.countOnDay]);
          });
          this.columnNames = ['Hashtags', 'Counts'];
        }
      );
  }

  getNumberPostsPerDay() {
    const url =  this.mainUrl + `/posts/numberOfPostsPerDay`;
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
          this.postsPerDay = data as PostPerDay[];
        },
        (err) => console.log(err),
        () => {
          // this.trendingHashtags.forEach(hash => {
          //   this.chartData.push([hash.hashtag, hash.countOnDay]);
          // });
          // this.columnNames = ['Hashtags', 'Counts'];
        }
      );
  }

  getNumberRepliesPerDay() {
    const url =  this.mainUrl + `/messages/numberOfRepliesPerDay`;
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
          this.repliesPerDay = data as PostPerDay[];
        },
        (err) => console.log(err),
        () => {
          // this.trendingHashtags.forEach(hash => {
          //   this.chartData.push([hash.hashtag, hash.countOnDay]);
          // });
          // this.columnNames = ['Hashtags', 'Counts'];
        }
      );
  }

  getLikesPerDay() {
    const url =  this.mainUrl + `/reactions/likesPerDay`;
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
          this.likesPerDay = data as PostPerDay[];
        },
        (err) => console.log(err),
        () => {
          // this.trendingHashtags.forEach(hash => {
          //   this.chartData.push([hash.hashtag, hash.countOnDay]);
          // });
          // this.columnNames = ['Hashtags', 'Counts'];
        }
      );
  }

  getDislikesPerDay() {
    const url =  this.mainUrl + `/reactions/dislikesPerDay`;
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
          this.dislikesPerDay = data as PostPerDay[];
        },
        (err) => console.log(err),
        () => {
          // this.trendingHashtags.forEach(hash => {
          //   this.chartData.push([hash.hashtag, hash.countOnDay]);
          // });
          // this.columnNames = ['Hashtags', 'Counts'];
        }
      );
  }



}
