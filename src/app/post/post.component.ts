import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../services/post.service';
import { UserService} from "../services/user.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() chatId: number;

  constructor(private postService: PostService, private userService: UserService) {}

  private SIGNEDINUSERID;
  private SIGNEDINPERSONID;

  private userChatReactions;

  ngOnInit() {
    this.SIGNEDINPERSONID = this.userService.getCurrentUser().personId;
    this.SIGNEDINUSERID = this.userService.getCurrentUser().userId;

    this.postService.getPostsForChatIdFromDB(this.chatId);
    this.postService.getAllReactionsfromDB();
    this.postService.getAllRepliesFromDB();
    this.userChatReactions = this.postService.getChatReactionsMap();
  }

  private newPost = {
    chatId: null,
    userId: null,
    src: null,
    content: null
  };

  refresh() {
    this.postService.refresh();
  }
  getAllPosts() {
    const posts: HTMLCollectionOf<Element> = document.getElementsByClassName('cardsimg');
    if ( posts.length > 0 && this.postService.getAllPosts().length > 0) {
      for (let i = 0 ; i < posts.length ; i++) {
        if (this.postService.getAllPosts()[i].postId === null) {
          posts[i].setAttribute('src', this.postService.getAllPosts()[i].photourl);
        } else {
          posts[i].setAttribute('src', 'http://localhost:5000/InstaPost/images/' + this.postService.getAllPosts()[i].photourl);
        }
      }
    }
    return this.postService.getAllPosts();
  }

  getReactionsMap(messageId) {
    return this.postService.getReactionsMap(messageId);
  }

  loadFile(e) {
    const x = document.getElementById('preview');
    const src = URL.createObjectURL(e.target.files[0]);
    x.setAttribute('src', src);
    this.newPost.src = src;
    console.log(this.newPost);
  }

  addPost() {
    this.newPost.chatId = this.chatId;
    this.newPost.userId = this.SIGNEDINUSERID;
    console.log(this.newPost.chatId);
    this.postService.addPostToDB(this.newPost);
    this.newPost.src = null;
    this.newPost.content = null;
  }

  addReaction(postId, messageId, reactionType){
    const newReaction = {
      userId: this.SIGNEDINUSERID,
      postId: postId,
      messageId: messageId,
      reactionType: reactionType
    };
    console.log(newReaction);
    this.postService.addReactionToDB(newReaction);
  }

  userAlreadyReacted(messageId, reactionType){
    if(this.userChatReactions.has(messageId)){
      var type = this.userChatReactions.get(messageId);
      if(type == reactionType) return true;
      else return false;
    } else return false;
  }
}
