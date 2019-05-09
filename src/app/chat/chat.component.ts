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

  private contactsToBeAdded = {
    participants: [],
    chatId: null,
  };

  public contactsArray: Person[];
  public displayedColumns: string[] = ['checkbox','name', 'phoneNumber'];
  public usersInChat: Person[];

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
    this.contactsArray = null;
    this.homeService.getContactsOfUserNotInChat(this.SIGNEDINPERSONID, this.CHATID);
    this.contactsArray = this.homeService.getContactsOfUser();
    console.log(this.contactsArray)
  }

  getUsersInChat(){
    this.homeService.getUsersInChatFromDB(this.CHATID);
    this.usersInChat = this.homeService.getUsersInChat();
    console.log(this.usersInChat)
  }

  boxchecked(e) {
    if (e.checked) this.contactsToBeAdded.participants.push(e.source.value);
    else {
      const i = this.contactsToBeAdded.participants.findIndex(mem => mem === e.source.value );
      this.contactsToBeAdded.participants.splice(i, 1);
    }
  }

  addParticipantsToChat(){
    console.log(this.contactsToBeAdded)
    this.contactsToBeAdded.chatId = this.CHATID;
    this.homeService.addParticipantsToChat(this.contactsToBeAdded, this.CHATID);
    this.contactsToBeAdded.participants=null;
  }

}
