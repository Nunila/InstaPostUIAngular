import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {Chat, Reactions, Post, Reply, Reaction} from './interfaces';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient, private userService: UserService) { }

  // mainUrl = `http://instapostdb.herokuapp.com/InstaPost`;
  mainUrl = `http://localhost:5000/InstaPost`;
  private allPosts: Post[] = new Array();
  private allReactionsMap: Map<number, Reactions> = new Map();
  public mapdone = false;
  private allReplies: Reply[] = new Array();
  private allRepliesMap: Map<number, Reply[]> = new Map();
  private updatedReplies: Reply[] = new Array();

  private userReactionsMap: Map<number, string> = new Map();
  private currentChat: Chat ;

  refresh() {
    this.allPosts = new Array();
    this.allReactionsMap = new Map();
    this.allRepliesMap = new Map();

    this.getPostsForChatIdFromDB(this.currentChat.chatId);
    this.getAllReactionsfromDB();
    this.getAllRepliesFromDB();
    //this.getChatReactionsFromDB();
    this.getChatReactionsFromDB(this.userService.getCurrentUser().userId, this.currentChat.chatId);
  }

  setCurrentChat(chat: Chat) {
    this.currentChat = chat;
  }

  getCurrentChat() {
    return this.currentChat;
  }

  getInfoOfCurrentChat(chatId) {
    const url =  this.mainUrl + `/chats/` + chatId;
    const headersDict = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    };
    const requestOptions = {
      headers: new HttpHeaders(headersDict)
    };

    this.http.get(url, requestOptions)
      .subscribe(data => {
          this.currentChat = data as Chat;
        },
        (err) => console.log(err),
        () => {
        }
      );
  }
  // ----------------------------POST SERVICES-------------------------------

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

  addPostToDB(newPost) {
    const url =  this.mainUrl + `/posts`;
    const headersDict = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    };
    const requestOptions = {
      headers: new HttpHeaders(headersDict)
    };
    console.log(newPost);

    this.http.post(url, newPost).subscribe(data => {
      },
      (err) => console.log(err),
      () => {
        // t his.getChatsOfUserFromDB(this.SIGNEDINUSERID);

      }
    );

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

  getPostsForChatIdFromDB(chatId) {
    this.allPosts = [];
    const url =  this.mainUrl + `/posts/chat/` + chatId;
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
          // console.log(this.allPosts);
        },
        (err) => console.log(err),
        () => {
        }
      );
  }

  //---------------------------------REPLY SERVICES-------------------------------------------


  addReply(newReply) {
    const reply: Reply = {
      messageId: newReply.messageId,
      postId: newReply.postId,
      userId: newReply.userId,
      content: newReply.content,
      messageDate: new Date().toString(),
      username: 'newReply'
    };
    let replies: Reply[] = [];
    if (!this.allRepliesMap.has(reply.postId)) {
      this.addReplyToDB(reply);
      this.allReplies.push(reply);
      this.allRepliesMap.set(reply.postId, replies);
    } else{
      replies = this.allRepliesMap.get(reply.postId);
      this.addReplyToDB(reply);
      this.allReplies.push(reply);
      this.allRepliesMap.set(reply.postId, replies);
    }
  }

  addReplyToDB(newReply) {
    const url =  this.mainUrl + `/messages/allreplies`;
    const headersDict = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    };
    const requestOptions = {
      headers: new HttpHeaders(headersDict)
    };
    console.log(newReply);

    this.http.post(url, newReply).subscribe(data => {
        const a = data as Reply;
        console.log(a);
        let replies: Reply[] = [];
        if (!this.allRepliesMap.has(a.postId)) {
          replies.push({messageId: a.messageId, postId: a.postId, userId: a.userId, content: a.content,
            messageDate: a.messageDate, username: newReply.username});
          // this.allReplies.push({messageId: a.messageId, postId: a.postId, userId: a.userId, content: a.content,
          // messageDate: a.messageDate, username: newReply.username});
          this.allRepliesMap.set(a.postId, replies);
        } else {
          replies = this.allRepliesMap.get(a.postId);
          replies.push({messageId: a.messageId, postId: a.postId, userId: a.userId, content: a.content,
            messageDate: a.messageDate, username: newReply.username});
          // this.allReplies.push({messageId: a.messageId, postId: a.postId, userId: a.userId, content: a.content,
          // messageDate: a.messageDate, username: newReply.username});
          this.allRepliesMap.set(a.postId, replies);
        }
        },
      (err) => console.log(err),
      () => {
        // console.log(this.allRepliesMap.get(newReply.postId));
      }
    );
  }

  getAllRepliesFromDB() {
    this.allRepliesMap = new Map();
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
          this.allReplies = data as Reply[];
          this.allReplies.forEach(reply => {
            let replies: Reply[] = [];
            if (!this.allRepliesMap.has(reply.postId)) {
              replies.push(reply);
              this.allRepliesMap.set(reply.postId, replies);
            } else {
              replies = this.allRepliesMap.get(reply.postId);
              replies.push(reply);
              this.allRepliesMap.set(reply.postId, replies);
            }
          });
          // console.log(this.allRepliesMap);
        },
        (err) => console.log(err),
        () => {
        }
      );
  }

  getRepliesMap(postid) {
    // console.log(postid);
    // console.log(this.allRepliesMap.get(postid));
    if (this.allRepliesMap.has(postid)) {
      return this.allRepliesMap.get(postid);
    } else {
      return 0;
    }
  }

  // -------------------------------------REACTIONS SERVICES-------------------------------------

  addReaction(messageId, likeordislike) {
    if (this.allReactionsMap.has(messageId)) {
      let old = this.allReactionsMap.get(messageId);
      if (likeordislike === 'LIKE') {
        old.likes++;
      } else {
        old.dislikes++;
      }
      this.allReactionsMap.set(messageId, old);
    }
    else {
      let reac: Reactions = {messageId, likes: 0, dislikes: 0};
      if (likeordislike === 'LIKE')  reac.likes++;
      else reac.dislikes++;
      this.allReactionsMap.set(messageId, reac);
      console.log();
    }
  }

  addReactionToDB(reaction) {
    this.addReaction(reaction.messageId, reaction.reactionType);
    this.userReactionsMap.set(reaction.messageId, reaction.reactionType);
    const url =  this.mainUrl + '/reactions';
    const headersDict = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    };
    const requestOptions = {
      headers: new HttpHeaders(headersDict)
    };

    this.http.post(url, reaction).subscribe(data => {
      },
      (err) => console.log(err),
      () => {
        // t his.getChatsOfUserFromDB(this.SIGNEDINUSERID);

      }
    );
  }

  getAllReactionsfromDB() {
    this.allReactionsMap = new Map();
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
        console.log(reactions);
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

  getChatReactionsFromDB(userId, chatId) {
    this.userReactionsMap = new Map();
    const url =  this.mainUrl + `/reactions/user/` + userId + '/chat/' + chatId;
    const headersDict = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    };
    const requestOptions = {
      headers: new HttpHeaders(headersDict)
    };

    this.http.get(url, requestOptions)
      .subscribe(data => {
          const reactions = data as Reaction[];
          reactions.forEach(reaction => {
            this.userReactionsMap.set(reaction.messageId, reaction.type);
          });
        },
        (err) => console.log(err),
        () => {
          console.log(this.allReactionsMap);
        }
      );
  }

  getChatReactionsMap() {
    return this.userReactionsMap;
  }

  deleteReaction(reaction) {
    const url =  this.mainUrl + `/deletereaction/user/` + reaction.userId + '/message/' + reaction.messageId ;
    console.log(reaction);
    const headersDict = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    };
    const requestOptions = {
      headers: new HttpHeaders(headersDict)
    };

    this.http.delete(url)
      .subscribe(data => {
        },
        (err) => console.log(err),
        () => {
          // const i = this.chatsOfUser.findIndex(chat => chat.chatId === chatid);
          // this.chatsOfUser.splice(i, 1);
        }
      );
  }

}
