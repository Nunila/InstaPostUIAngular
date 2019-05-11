import { Component, OnInit, Input } from '@angular/core';
import {PostService} from '../services/post.service';
import {UserService} from "../services/user.service";
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() postId: number;

  constructor(private postService: PostService, private userService: UserService) { }

  private SIGNEDINUSERID;
  private SIGNEDINPERSONID;

  ngOnInit() {
    // console.log(this.postId);
    //this.postService.getAllRepliesFromDB();
    this.SIGNEDINPERSONID = this.userService.getCurrentUser().personId;
    this.SIGNEDINUSERID = this.userService.getCurrentUser().userId;

  }

  private newReply = {
    postId: null,
    userId: null,
    content: null,
    messageDate: null,
  }

  getReactionsMap(messageId) {
    return this.postService.getReactionsMap(messageId);
  }

  getAllReplies() {
    //console.log(this.postService.getAllReplies());
    const replies = this.postService.getRepliesMap(this.postId);
    //console.log(replies);
    return replies;
  }

  getRepliesByPostId() {
    console.log(this.postId);
    this.postService.getRepliesMap(this.postId);
  }

  addReply() {
    console.log(this.postId);
    this.newReply.userId = this.SIGNEDINUSERID;
    this.newReply.postId = this.postId;
    this.postService.addReplyToDB(this.newReply);
    this.newReply.content= null;
  }

  addReaction(messageId, reactionType){
    const newReaction = {
      userId: this.SIGNEDINUSERID,
      postId: this.postId,
      messageId: messageId,
      reactionType: reactionType
    };
    console.log(newReaction);
    this.postService.addReactionToDB(newReaction);
  }
}
