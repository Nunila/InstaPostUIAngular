import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {UserService} from './user.service';

interface Chat {
  chatId: number;
  chatName: string;
  creationDate: string;
  ownerId: number;
}

interface Person {
  userId: number;
  personId: number;
  username: string;
  firstName: string;
  lastName: string;
  birthday: string;
  phonenumber: string;
  email: string;
}

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
  private personSignedInInfo: Person;

  public contactResult;
  public flag = 'none';



  constructor(private http: HttpClient, private userService: UserService) { }

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

  getPersonInfoOfSignedInUserFromDB() {
    const url =  this.mainUrl + `/person/` + this.SIGNEDINPERSONID;
    const headersDict = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    };
    const requestOptions = {
      headers: new HttpHeaders(headersDict)
    };

    this.http.get(url, requestOptions)
      .subscribe(data => {
          this.personSignedInInfo = data as Person;
        },
        (err) => console.log(err),
        () => {
        }
      );
   }

}
