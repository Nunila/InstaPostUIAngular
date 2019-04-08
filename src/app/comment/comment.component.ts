import { Component, OnInit, Input } from '@angular/core';
import {ReplyService} from '../services/reply.service';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() postId: number;

  constructor(private replyService: ReplyService) { }
  private newReply={
    postId: null,
    userId: null,
    content: null
  }

  ngOnInit() {
    //console.log(this.postId);
    //this.replyService.getRepliesByPostIdFromDB(this.postId);
  }


  getAllReplies(){
    //console.log(this.replyService.getAllReplies());
    return this.replyService.getAllReplies();
  }

  getRepliesByPostId(){
    console.log(this.postId);
    this.replyService.getRepliesByPostIdFromDB(this.postId);
  }

  addReply(){
    this.replyService.addReply(this.newReply);
  }
}
