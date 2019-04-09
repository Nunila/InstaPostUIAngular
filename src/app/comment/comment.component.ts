import { Component, OnInit, Input } from '@angular/core';
import {PostService} from '../services/post.service';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() postId: number;

  constructor(private postService: PostService) { }
  private newReply= {
    postId: null,
    userId: null,
    content: null
  }

  ngOnInit() {
    // console.log(this.postId);
    // this.postService.getRepliesByPostIdFromDB(this.postId);
  }

  getReactionsMap(messageId) {
    return this.postService.getReactionsMap(messageId);
  }

  getAllReplies() {
    // console.log(this.postService.getAllReplies());
    return this.postService.getRepliesMap(this.postId);
  }

  getRepliesByPostId() {
    console.log(this.postId);
    this.postService.getRepliesMap(this.postId);
  }

  addReply() {
    console.log(this.postId);
    this.newReply.postId = this.postId;
    this.postService.addReply(this.newReply);
    this.newReply.content='';
  }
}
