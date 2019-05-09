import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {Hashtag, PostPerDay} from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public selectedStatistic = 'trending#';

  private trendingHashtags: Hashtag[] = [];
  public postsPerDay: PostPerDay[] = [];
  public repliesPerDay: PostPerDay[] = [];
  public likesPerDay: PostPerDay[] = [];
  public dislikesPerDay: PostPerDay[] = [];
  public mostActiveUsers: Map<string, object> = new Map();
  public mostActiveKeys = [];

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
        this.getMostActiveUsersByDate();
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

  getMostActiveUsersByDate() {
    this.mostActiveKeys = [];
    this.mostActiveUsers = new Map();
    const url =  this.mainUrl + `/users/mostactive`;
    const headersDict = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    };
    const requestOptions = {
      headers: new HttpHeaders(headersDict)
    };

    this.http.get(url, requestOptions)
      .subscribe(data => {
        const entries = Object.entries(data);
        entries.forEach((dateWithUsers, i) => {
            let arr = dateWithUsers[1];
            if (arr.length > 3) {
              arr.splice(3, arr.length - 3);
            }
            this.mostActiveUsers.set(dateWithUsers[0], arr);
            this.mostActiveKeys.push(dateWithUsers[0]);
          });
        },
        (err) => console.log(err),
        () => {
          this.mostActiveKeys.reverse();

          // this.trendingHashtags.forEach(hash => {
          //   this.chartData.push([hash.hashtag, hash.countOnDay]);
          // });
          // this.columnNames = ['Hashtags', 'Counts'];
        }
      );
  }



}
