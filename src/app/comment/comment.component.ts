import { Component, OnInit } from '@angular/core';
import {ReplyService} from '../services/reply.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  constructor(private replyService: ReplyService) { }

  ngOnInit() {
    this.replyService.getAllRepliesFromDB();
  }


  getAllReplies(){
    //console.log(this.replyService.getAllReplies());
    return this.replyService.getAllReplies();
  }
}
