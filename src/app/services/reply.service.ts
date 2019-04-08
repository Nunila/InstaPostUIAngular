import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';

interface Reply {
  messageId: number;
  postId: number;
  userId: number;
  content: string;
  messageDate: string;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReplyService {

  mainUrl = `http://localhost:5000/InstaPost`;
  private allReplies: Reply[] = new Array();

  constructor(private http: HttpClient) { }

  addReply(newReply) {
    const reply: Reply = {
      messageId: null,
      postId: newReply.postId,
      userId: null,
      content: newReply.content,
      messageDate: new Date().toString(),
      username: null
    };
    this.allReplies.push(reply);
  }

  getAllReplies() {
    // console.log(this.allReplies);
    return this.allReplies;
  }

  getAllRepliesFromDB() {
    const url = this.mainUrl + '/messages/replies';
    const headersDict = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    };
    const requestOptions = {
      headers: new HttpHeaders(headersDict)
    };

    this.http.get(url, requestOptions)
      .subscribe(data => {
       // console.log(data)
        const asd = data as Reply[];
        this.allReplies = asd;
       // console.log(data);
      },
        (err) => console.log(err),
        () => {
        }
    );
  }

  getRepliesByPostIdFromDB(postId) {
    const url = this.mainUrl + '/messages/repliesbypostid/' + postId;
    const headersDict = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    };
    const requestOptions = {
      headers: new HttpHeaders(headersDict)
    };

    this.http.get(url, requestOptions)
      .subscribe(data => {
          // console.log(data)
          this.allReplies  = data as Reply[];
          // console.log(data);
        },
        (err) => console.log(err),
        () => {
        }
      );
  }
}
