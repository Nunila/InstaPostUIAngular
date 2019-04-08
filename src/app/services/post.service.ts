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

interface Reactions {
  type: string;
  messageId: number;
  count: number;
}

interface DividedReactions {
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
  private allReactionsMap: Map<number, DividedReactions[]> = new Map();
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

  getReactionsMap(postid, reactiontype: string) {
    if (this.allReactionsMap.get(postid)) {
      return this.allReactionsMap.get(postid)[0][reactiontype];
    } else {
      return 0;
    }
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
          const entries = Object.entries(data);
          entries.forEach(post => {
            const postid: number = parseInt(post[0], 10);
            const object: Reactions[] = post[1];
            const dividedReactions: DividedReactions[] = new Array();
            const sampledividedreaction: DividedReactions = {
              likes: 0, dislikes: 0, messageId: null
            };
            object.forEach(reaction  => {
              if (reaction.type === 'DISLIKE') {
                sampledividedreaction.dislikes = reaction.count;
              } else {
                sampledividedreaction.likes = reaction.count;
              }
              sampledividedreaction.messageId = reaction.messageId;
            });
            dividedReactions.push(sampledividedreaction);
            this.allReactionsMap.set(postid, dividedReactions);
          });
        },
        (err) => console.log(err),
        () => {
          this.mapdone = true;
        }
      );
  }

}
