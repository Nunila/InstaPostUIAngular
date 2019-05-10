import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {Hashtag, PostForSelect, PostPerDay} from './interfaces';
import {DatePipe} from '@angular/common';
import {count} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public selectedStatistic = 'trending#';
  public selectedUser: number;
  public selectedPost: number;

  private trendingHashtags: Hashtag[] = [];
  public postsPerDay: PostPerDay[] = [];
  public repliesPerDay: PostPerDay[] = [];
  public likesPerDay: PostPerDay[] = [];
  public dislikesPerDay: PostPerDay[] = [];
  public postsPerDayOfUser: PostPerDay[] = [];
  public postsForSelect: PostForSelect[] = [];
  public postReactions = {
    numberOfLikes: null,
    numberOfDislikes: null,
    numberOfReplies: null
  };
  public activeuserdataarr = [];
  public activeusercolumnarr = [];


  public mostActiveUsers: Map<string, object> = new Map();
  public mostActiveKeys = [];

  public chartData = [];
  public columnNames;

  // mainUrl = `https://instapostdb.herokuapp.com/InstaPost`;
  mainUrl = `http://localhost:5000/InstaPost`;

  constructor(private http: HttpClient, private datepipe: DatePipe) {
  }

  getSelectedStat() {
    this.chartData = [];
    switch (this.selectedStatistic) {
      case 'trending#': {
        if (this.trendingHashtags.length > 0) {
          this.trendingHashtags.forEach(hash => {
            this.chartData.push([hash.hashtag, hash.countOnDay]);
          });
          this.columnNames = ['Hashtags', 'Counts'];
        }
        else this.getTrendingHashtags();
        break;
      }
      case 'postsPerDay': {
        this.getNumberPostsPerDay();
        break;
      }
      case 'activeuser': {
        this.getMostActiveUsersByDate();
        break;
      }
      case 'postUser': {
        //this.getPostsPerDayOfUser();
        break;
      }
      case 'dislikesPerDay': {
        this.getDislikesPerDay();
        break;
      }
      case 'reactPost': {
        this.getAllPostsForSelect();
        break;
      }
      case 'likesPerDay': {
        this.getLikesPerDay();
        break;
      }
      case    'repliesPerDay'  : {
        this.getNumberRepliesPerDay();
        break;
      }
      default: {
        break;
      }
    }
  }


  getTrendingHashtags() {
    const url = this.mainUrl + `/hashtags/trending`;
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
    const url = this.mainUrl + `/posts/numberOfPostsPerDay`;
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
          this.postsPerDay.forEach(posts => {
            this.chartData.push([this.datepipe.transform(posts.day, 'fullDate'), posts.total]);
          });
          this.columnNames = ['Date', 'Count'];
        }
      );
  }

  getNumberRepliesPerDay() {
    const url = this.mainUrl + `/messages/numberOfRepliesPerDay`;
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
          this.repliesPerDay.forEach(posts => {
            this.chartData.push([this.datepipe.transform(posts.day, 'fullDate'), posts.total]);
          });
          this.columnNames = ['Date', 'Count'];
        }
      );
  }

  getLikesPerDay() {
    const url = this.mainUrl + `/reactions/likesPerDay`;
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
          this.likesPerDay.forEach(posts => {
            this.chartData.push([this.datepipe.transform(posts.day, 'fullDate'), posts.total]);
          });
          this.columnNames = ['Date', 'Count'];
        }
      );
  }

  getDislikesPerDay() {
    const url = this.mainUrl + `/reactions/dislikesPerDay`;
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
          this.dislikesPerDay.forEach(posts => {
            this.chartData.push([this.datepipe.transform(posts.day, 'fullDate'), posts.total]);
          });
          this.columnNames = ['Date', 'Count'];
        }
      );
  }

  getPostsPerDayOfUser() {
    const url = this.mainUrl + `/posts/numberOfPostsPerDay/` + this.selectedUser;
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
          this.postsPerDayOfUser = data as PostPerDay[];
        },
        (err) => console.log(err),
        () => {
          this.postsPerDayOfUser.forEach(posts => {
            this.chartData.push([this.datepipe.transform(posts.day, 'fullDate'), posts.total]);
          });
          this.columnNames = ['Date', 'Count'];
        }
      );
  }

  getMostActiveUsersByDate() {
    this.mostActiveKeys = [];
    this.mostActiveUsers = new Map();
    const url = this.mainUrl + `/users/mostactive`;
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
        console.log(this.mostActiveUsers);
        this.mostActiveKeys.reverse();
        var arr2 = [];
        this.mostActiveUsers.forEach( (values, key) => {
          var aa = values as object[];
          var arr = [];
          this.activeusercolumnarr.push(key);
          for (let a of aa) {
            arr.push([a['username'], a['count']]);
          }
          this.activeuserdataarr.push(arr);
        });
        }
      );
  }

  getAllPostsForSelect() {
    const url = this.mainUrl + `/posts/forDashboard`;
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
          this.postsForSelect = data as PostForSelect[];
        },
        (err) => console.log(err),
        () => {

        }
      );
  }

  getAllReactionsForPost() {
    const url = this.mainUrl + `/numberofRepliesLikesDislikes/` + this.selectedPost;
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
          this.postReactions.numberOfReplies = data['numberOfReplies'];
          this.postReactions.numberOfDislikes = data['numberOfDislikes'];
          this.postReactions.numberOfLikes = data['numberOfLikes'];
        },
        (err) => console.log(err),
        () => {
          this.chartData = [['Replies', this.postReactions.numberOfReplies], ['Likes', this.postReactions.numberOfLikes],['Dislikes', this.postReactions.numberOfDislikes]];
          this.columnNames = ['Date', 'Reactions'];
        }
      );
  }
}
