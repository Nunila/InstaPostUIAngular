import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';

interface Post {
  postId: number;
  chatId: number;
  userId: number;
  messageId: number;
  photourl: string;
  postDate: string;
  content: string;
  username: string;
}

// interface Reactions {
//   type: string;
//   messageId: number;
//   count: number;
// }

interface Reactions {
  messageId: number;
  likes: number;
  dislikes: number;
}


@Injectable({
  providedIn: 'root'
})
export class PostService {

  mainUrl = `http://localhost:5000/InstaPost`;
  private allPosts: Post[] = new Array();
  private allReactionsMap: Map<number, Reactions> = new Map();
  public mapdone = false;

  constructor(private http: HttpClient) { }

  refresh() {
    this.allPosts = new Array();
    this.allReactionsMap = new Map();
    this.getAllPostsFromDB();
    this.getAllReactionsfromDB();
  }

  addPost(newPost) {
    const post: Post = {
      postId: null,
      chatId: null,
      userId: null,
      messageId: null,
      photourl: newPost.src,
      postDate: new Date().toString(),
      content: newPost.content,
      username: 'ANewUser'
    };
    this.allPosts.push(post);
  }

  getAllPosts() {
    return this.allPosts;
  }

  getAllPostsFromDB() {
    const url =  this.mainUrl + `/posts`;
    const headersDict = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    };
    const requestOptions = {
      headers: new HttpHeaders(headersDict)
    };

    this.http.get(url, requestOptions)
      .subscribe(data => {
        const asd = data as Post[];
        this.allPosts = asd;
        console.log(this.allPosts);
      },
        (err) => console.log(err),
        () => {
        }
    );
  }

  getAllReactionsfromDB() {
    const url =  this.mainUrl + `/reactionsPerMessage`;
    const headersDict = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    };
    const requestOptions = {
      headers: new HttpHeaders(headersDict)
    };

    this.http.get(url, requestOptions)
      .subscribe(data => {
        const reactions = data as Reactions[];
        reactions.forEach(reaction => {
            this.allReactionsMap.set(reaction.messageId, reaction);
        });
        },
        (err) => console.log(err),
        () => {
          console.log(this.allReactionsMap);
        }
      );
  }

  getReactionsMap(messageid) {
    if (this.allReactionsMap.get(messageid)) {
      return this.allReactionsMap.get(messageid);
    } else {
      return 0;
    }
  }

}
