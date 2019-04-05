import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';

interface Reply{
  messageId: number;
  postId: number;
  userId: number;
  content: string;
  messagedate: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReplyService {

  mainUrl = `http://localhost:5000/InstaPost`;
  private allReplies: Reply[] = new Array();

  constructor(private http: HttpClient) { }

  getAllReplies(){
    return this.allReplies;
  }

  getAllRepliesFromDB(){
    const url = this.mainUrl + '/messages/replies'
    const headersDict = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    };
    const requestOptions = {
      headers: new HttpHeaders(headersDict)
    };

    this.http.get(url, requestOptions)
      .subscribe(data => {
        const asd = data as Reply[];
        this.allReplies = asd;
      },
        (err) => console.log(err),
        () => {
        }
    );
  }
}
