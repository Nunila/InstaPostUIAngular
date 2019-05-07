import { Component, OnInit, Input } from '@angular/core';
import { PostService } from "../services/post.service";
import {HomeService, Person} from "../services/home.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @Input() chatId: number;

  constructor(private postService: PostService, private homeService: HomeService) { }
  private newPost = {
    src: null,
    content: 'sample caption'
  };

  public contactsArray: Person[];
  public displayedColumns: string[] = ['checkbox','name', 'phoneNumber'];

  ngOnInit() {
  }

  getUserContacts(){
    this.homeService.getChatsOfUserFromDB(1)
    this.contactsArray = this.homeService.getContactsOfUser();
    console.log(this.contactsArray)
  }
}
