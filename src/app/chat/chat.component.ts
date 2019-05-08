import { Component, OnInit, Input } from '@angular/core';
import { PostService } from "../services/post.service";
import {HomeService} from "../services/home.service";
import { Person } from "../services/interfaces";
import { UserService} from "../services/user.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @Input() chatId: number;

  constructor(private postService: PostService, private homeService: HomeService, private userService: UserService, private route: ActivatedRoute, private router: Router ) { }

  private CHATID;
  private SIGNEDINUSERID;
  private SIGNEDINPERSONID;

  private newPost = {
    src: null,
    content: 'sample caption'
  };

  public contactsArray: Person[];
  public displayedColumns: string[] = ['checkbox','name', 'phoneNumber'];

  ngOnInit() {
    this.CHATID = this.route.snapshot.paramMap.get('chatId');
    // this.postService.getInfoOfCurrentChat(this.CHATID);
    this.SIGNEDINPERSONID = this.userService.getCurrentUser().personId;
    this.SIGNEDINUSERID = this.userService.getCurrentUser().userId;
  }

  getCurrentChat() {
    return this.postService.getCurrentChat();
  }

  getUserContacts(){
    this.homeService.getChatsOfUserFromDB(this.SIGNEDINUSERID)
    this.contactsArray = this.homeService.getContactsOfUser();
    console.log(this.contactsArray)
  }
}
