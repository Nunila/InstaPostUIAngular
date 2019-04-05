import { Component, OnInit } from '@angular/core';
import {ReplyService} from '../services/reply.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  constructor(private replyService: ReplyService) { }
  private got=0;

  ngOnInit() {
    this.replyService.getAllRepliesFromDB();
  }


  getAllReplies(){
    const replies: HTMLCollectionOf<Element> = document.getElementsByClassName('comments');
    console.log(this.replyService.getAllReplies());
    if ( replies.length > 0 && this.replyService.getAllReplies().length > 0) {
      for (let i = 0 ; i < replies.length ; i++) {
        replies[i].setAttribute('src', this.replyService.getAllReplies()[i].content);
      }
    }
    return this.replyService.getAllReplies();
  }
}
