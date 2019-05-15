import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {UserService} from './user.service';
import {DatePipe} from '@angular/common';
import {Chat, Person, CompletePerson} from './interfaces';
import Swal from 'sweetalert2';
import {Observable} from 'rxjs';

// interface Chat {
//   chatId: number;
//   chatName: string;
//   creationDate: string;
//   ownerId: number;
// }

// export interface Person {
//   userId: number;
//   personId: number;
//   username: string;
//   firstName: string;
//   lastName: string;
//   birthday: string;
//   phonenumber: string;
//   email: string;
// }

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  // mainUrl = `https://instapostdb.herokuapp.com/InstaPost`;
  mainUrl = `http://localhost:5000/InstaPost`;

  private chatsOfUser: Chat[] = [];
  public SIGNEDINUSERID = this.userService.getCurrentUser().userId;
  public SIGNEDINPERSONID = this.userService.getCurrentUser().personId;
  private contactsOfUser: Person[] = [];
  private personSignedInInfo: CompletePerson;
  public usersInChat: Observable<any>;
  public usersToAdd: Observable<any>;

  public contactResult;
  public flag = 'none';
  public selectedComponent = 'chats';
  public variablesHaveBeenInitialized = false;

  public firebaseConfig = {
    apiKey: " AIzaSyD_dpemBfkRYlOxtvXH0_M_r4Xv-juDxu8 ",
    authDomain: "project-id.firebaseapp.com",
    databaseURL: "https://project-id.firebaseio.com",
    projectId: "project-id",
    storageBucket: "project-id.appspot.com",
    messagingSenderId: "sender-id",
    appID: "app-id",
  };

  constructor(private http: HttpClient, private userService: UserService, private datepipe: DatePipe) { }


  logout() {
    this.SIGNEDINPERSONID = 0;
    this.SIGNEDINUSERID = 0;
    this.personSignedInInfo = null;
    this.flag = 'none';
    this.selectedComponent = 'chats';
    this.variablesHaveBeenInitialized = false;
  }

  setSelected(a) {
    this.selectedComponent = a;
  }
  // ---------------------------Methods for Chats -----------------------------------//

  getChatsOfUser() {
    return this.chatsOfUser;
  }

  getChatsOfUserFromDB(uid) {
    this.chatsOfUser = [];
    const url =  this.mainUrl + `/chats/member/` + uid;
    const headersDict = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    };
    const requestOptions = {
      headers: new HttpHeaders(headersDict)
    };

    this.http.get(url, requestOptions)
      .subscribe(data => {
          this.chatsOfUser = data as Chat[];
        },
        (err) => console.log(err),
        () => {
        }
      );
  }

  addChat(newchat) {
    const url =  this.mainUrl + `/chats`;
    const headersDict = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    };
    const requestOptions = {
      headers: new HttpHeaders(headersDict)
    };
    console.log(newchat)

    this.http.post(url, newchat )
      .subscribe(data => {
        const a = data as Chat;
        this.chatsOfUser.push({chatId: a.chatId, creationDate: a.creationDate, chatName: a.chatName, ownerId: this.SIGNEDINUSERID});
        },
        (err) => console.log(err),
        () => {
        }
      );
  }

  deleteChat(chatid) {
    const url =  this.mainUrl + `/chats/` + chatid;

    this.http.delete(url)
      .subscribe(data => {
        },
        (err) => console.log(err),
        () => {
          const i = this.chatsOfUser.findIndex(chat => chat.chatId === chatid);
          this.chatsOfUser.splice(i, 1);
        }
      );
  }

  getUsersInChatFromDB(chatId) {
    const url =  this.mainUrl + `/users/chat/` + chatId;
    const headersDict = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    };
    const requestOptions = {
      headers: new HttpHeaders(headersDict)
    };

    this.usersInChat = this.http.get(url, requestOptions);
    // this.http.get(url, requestOptions)
    //   .subscribe(data => {
    //       this.usersInChat = data as Person[];
    //       console.log(this.usersInChat)
    //     },
    //     (err) => console.log(err),
    //     () => {
    //     }
    //   );
  }

  getUsersInChat() {
    return this.usersInChat;

  }

  deleteParticipant(chatId, userId) {
    console.log(userId)
    const url =  this.mainUrl + `/removemember/chat/` + chatId + '/user/' + userId;

    this.http.delete(url)
      .subscribe(data => {
        },
        (err) => console.log(err),
        () => {
          // const i = this.usersInChat.findIndex(user => user.userId === userId);
          // this.usersInChat.splice(i, 1);
        }
      );
  }

  // ---------------------------Methods for Contacts -----------------------------------//

  getContactsOfUser() {
    return this.contactsOfUser;
  }

  getContactsOfUserFromDB(uid: number) {
    const url =  this.mainUrl + `/person/` + uid + `/contacts`;
    const headersDict = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    };
    const requestOptions = {
      headers: new HttpHeaders(headersDict)
    };

    this.http.get(url, requestOptions)
      .subscribe(data => {
          this.contactsOfUser = data as Person[];
        },
        (err) => console.log(err),
        () => {
        }
      );
  }

  getContactsOfUserNotInChat(userId: number, chatId: number){
    const url =  this.mainUrl + '/notparticipants/person/' + userId + '/chat/' + chatId;
    const headersDict = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    };
    const requestOptions = {
      headers: new HttpHeaders(headersDict)
    };

    this.usersToAdd = this.http.get(url, requestOptions);
      // .subscribe(data => {
      //     this.contactsOfUser = data as Person[];
      //     console.log(this.contactsOfUser);
      //   },
      //   (err) => console.log(err),
      //   () => {
      //   }
      // );
  }

  addParticipantsToChat(participants, chatId) {
    const url =  this.mainUrl + '/addparticipants/chat/' + chatId;
    const headersDict = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    };
    const requestOptions = {
      headers: new HttpHeaders(headersDict)
    };

    this.http.post(url, participants).subscribe(data => {
      },
      (err) => console.log(err),
      () => {
        // t his.getChatsOfUserFromDB(this.SIGNEDINUSERID);

      }
    );
  }

  searchForContact(possibleContact) {
    let url =  this.mainUrl + `/person?`;
    if (possibleContact.phonenumber) {
      url += 'phonenumber=' + possibleContact.phonenumber;
    }
    else if (possibleContact.email) {
      url += 'email=' + possibleContact.email;
    }
    const headersDict = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    };
    const requestOptions = {
      headers: new HttpHeaders(headersDict)
    };

    this.http.get(url, requestOptions)
      .subscribe(data => {
        this.contactResult = data as Person;
        },
        (err) => {
          console.log(err);
          this.flag = 'User not found. Please type another phone number or email address.';
        },
        () => {
          console.log(this.contactResult);
          this.flag = 'contact';
        }
      );
  }

  addContact() {
    const url =  this.mainUrl + `/person/contact/` + this.SIGNEDINPERSONID;
    const headersDict = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    };
    const requestOptions = {
      headers: new HttpHeaders(headersDict)
    };

    this.http.post(url, this.contactResult )
      .subscribe(data => {
          const a = data as Person;
          this.contactsOfUser.push(a);
          console.log(a);
        console.log(data);
        },
        (err) => console.log(err),
        () => {
          this.flag = 'none';
        }
      );
  }

  deleteContact(contactId) {
    const url =  this.mainUrl + `/person/contact/` + this.SIGNEDINPERSONID + `/delete/` + contactId;
    this.http.delete(url)
      .subscribe(data => {
        },
        (err) => console.log(err),
        () => {
          // this.getChatsOfUserFromDB(this.SIGNEDINUSERID);
          const i = this.contactsOfUser.findIndex(contact => contact.personId === contactId);
          this.contactsOfUser.splice(i, 1);
        }
      );
  }

  // ---------------------------Methods for Profile -----------------------------------//

  getProfileInfo() {
    return this.personSignedInInfo;
  }

  getPersonInfoOfSignedInUserFromDB(pid) {
    const url =  this.mainUrl + `/person/` + pid + `/complete`;
    const headersDict = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    };
    const requestOptions = {
      headers: new HttpHeaders(headersDict)
    };

    this.http.get(url, requestOptions)
      .subscribe(data => {
          this.personSignedInInfo = data as CompletePerson;
          this.personSignedInInfo.birthday = this.datepipe.transform(this.personSignedInInfo.birthday, 'yyyy-MM-dd');
          console.log(this.personSignedInInfo);
        },
        (err) => console.log(err),
        () => {
        }
      );
  }

  addPersonProfile(newPerson: Person) {
    const url =  this.mainUrl + `/person`;
    const headersDict = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    };
    const requestOptions = {
      headers: new HttpHeaders(headersDict)
    };

    this.http.post(url, newPerson )
      .subscribe(data => {
          const a = data as Person;
          this.SIGNEDINPERSONID = a.personId;
        },
        (err) => console.log(err),
        () => {
          Swal.fire(
            'Information Saved!',
            'Your information is now saved.',
            'success'
          );
        }
      );
  }

  updatePersonProfile() {
    const url =  this.mainUrl + `/person/` + this.SIGNEDINPERSONID;
    const headersDict = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    };
    const requestOptions = {
      headers: new HttpHeaders(headersDict)
    };

    console.log(this.personSignedInInfo);
    this.personSignedInInfo.birthday = this.datepipe.transform(this.personSignedInInfo.birthday, 'yyyy-MM-dd');
    console.log(this.personSignedInInfo);

    this.http.put(url, this.personSignedInInfo )
      .subscribe(data => {
          const a = data as CompletePerson;
          this.SIGNEDINPERSONID = a.personId;
        },
        (err) => console.log(err),
        () => {
          Swal.fire(
            'Information Updated!',
            'Your information is now updated.',
            'success'
          );
        }
      );
  }

}
