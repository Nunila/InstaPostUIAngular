import { Component, OnInit, Input } from '@angular/core';
import { PostService } from "../services/post.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @Input() chatId: number;

  constructor(private postService: PostService) { }
  private newPost = {
    src: null,
    content: 'sample caption'
  };

  ngOnInit() {
  }
}
