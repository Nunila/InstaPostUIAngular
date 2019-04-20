import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';

interface Chat {
  chatId: number;
  chatName: string;
  creationDate: string;
  ownerId: number;
}

interface Contact {
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

  mainUrl = `http://localhost:5000/InstaPost`;
  private chatsOfUser: Chat[] = [];
  private contactsOfUser: Contact[] = [];
  public SIGNEDINUSER = 1;

  public result;
  public flag = false

  constructor(private http: HttpClient) { }

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
          this.contactsOfUser = data as Contact[];
          console.log(this.contactsOfUser);
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
        this.chatsOfUser.push({chatId: a.chatId, creationDate: a.creationDate, chatName: a.chatName, ownerId: this.SIGNEDINUSER});
        },
        (err) => console.log(err),
        () => {
          //this.getChatsOfUserFromDB(this.SIGNEDINUSER);

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
          //this.getChatsOfUserFromDB(this.SIGNEDINUSER);
          const i = this.chatsOfUser.findIndex(chat => chat.chatId === chatid);
          this.chatsOfUser.splice(i, 1);
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
        this.result = data as Contact;
        },
        (err) => {
          console.log(err);
          this.result = 'User not found. Please type another phone number or email address.';
        },
        () => {
          console.log(this.result);
          this.flag = true;
        }
      );
  }

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
          console.log(this.chatsOfUser);
        },
        (err) => console.log(err),
        () => {
        }
      );
  }

}
