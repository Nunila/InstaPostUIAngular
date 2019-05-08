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

  ngOnInit() {
    this.SIGNEDINPERSONID = this.userService.getCurrentUser().personId;
    this.SIGNEDINUSERID = this.userService.getCurrentUser().userId;

    this.postService.getPostsForChatIdFromDB(this.chatId);
    this.postService.getAllReactionsfromDB();
    this.postService.getAllRepliesFromDB();
  }

  private newPost = {
    chatId: this.chatId,
    userId: this.SIGNEDINUSERID,
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
          posts[i].setAttribute('src', 'http://instapostdb.herokuapp.com/InstaPost/images/' + this.postService.getAllPosts()[i].photourl);
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
    this.postService.addPost(this.newPost);
    this.newPost.src = null;
    this.newPost.content = null;
  }

}
