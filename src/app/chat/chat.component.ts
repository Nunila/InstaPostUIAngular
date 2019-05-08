import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../services/post.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
  @Input() chatId: number;

  constructor(private postService: PostService, private route: ActivatedRoute, private router: Router ) { }

  private CHATID;

  private newPost = {
    src: null,
    content: 'sample caption'
  };

  ngOnInit() {
    this.CHATID = this.route.snapshot.paramMap.get('chatId');
    // this.postService.getInfoOfCurrentChat(this.CHATID);
  }

  getCurrentChat() {
    return this.postService.getCurrentChat();
  }
}
