import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {variable} from "@angular/compiler/src/output/output_ast";

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
export class PostService {

  mainUrl = `http://localhost:5000/InstaPost`;
  private allPosts: Post[] = new Array();
  private allReactionsMap: Map<number, Reactions> = new Map();
  public mapdone = false;
  private allReplies: Reply[] = new Array();
  private allRepliesMap: Map<number, Reply[]> = new Map();
  private updatedReplies: Reply[] = new Array();

  constructor(private http: HttpClient) { }

  refresh() {
    this.allPosts = new Array();
    this.allReactionsMap = new Map();
    this.allRepliesMap = new Map();

    this.getAllPostsFromDB();
    this.getAllReactionsfromDB();
    this.getAllRepliesFromDB();
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

  addReply(newReply) {
    const reply: Reply = {
      messageId: null,
      postId: newReply.postId,
      userId: null,
      content: newReply.content,
      messageDate: new Date().toString(),
      username: 'New User'
    };
    let replies: Reply[] = new Array();
    if (!this.allRepliesMap.has(reply.postId)) {
      replies.push(reply);
      this.allRepliesMap.set(reply.postId, replies);
    } else{
      replies = this.allRepliesMap.get(reply.postId);
      replies.push(reply);
      this.allRepliesMap.set(reply.postId, replies);
    }
  }
  addReaction(messageId, likeordislike) {
    let old = this.allReactionsMap.get(messageId);
    if (likeordislike === 'like') {
      old.likes += 1;
    } else {
      old.dislikes += 1;
    }
    this.allReactionsMap.set(messageId, old);
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
        this.allPosts = data as Post[];
        console.log(this.allPosts);
      },
        (err) => console.log(err),
        () => {
        }
    );
  }

  getRepliesMap(postid) {
    if (this.allRepliesMap.has(postid)) {
      return this.allRepliesMap.get(postid);
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

  getAllRepliesFromDB() {
    const url = this.mainUrl + '/messages/allreplies';
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
          this.allReplies = data as Reply[];
          console.log(this.allReplies);
          this.allReplies.forEach(reply => {
            // console.log(reply);
            let replies: Reply[] = new Array();
            if (!this.allRepliesMap.has(reply.postId)) {
              replies.push(reply);
              this.allRepliesMap.set(reply.postId, replies);
            } else {
              replies = this.allRepliesMap.get(reply.postId);
              replies.push(reply);
              this.allRepliesMap.set(reply.postId, replies);
            }
          });

        },
        (err) => console.log(err),
        () => {
        }
      );
  }
  postHasReplies(postId) {
    if (this.allRepliesMap.has(postId)) {
      return true;
    } else {
      return false;
    }
  }
  getReactionsMap(messageid) {
    if (this.allReactionsMap.get(messageid)) {
      return this.allReactionsMap.get(messageid);
    } else {
      return 0;
    }
  }

}
