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
  SIGNEDINUSER = 1;

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
    console.log(newchat);
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
          console.log(data);
          const a = data as Chat;
          this.addParticipates(a.chatId, newchat.ownerId, newchat.members);
        },
        (err) => console.log(err),
        () => {
          this.getChatsOfUserFromDB(this.SIGNEDINUSER);
        }
      );
  }

  addParticipates(chatid, ownerid, xmembers) {
    const a = {
      chatId : chatid,
      ownerId : ownerid,
      members : xmembers
    };
    const url =  this.mainUrl + `/participates`;
    const headersDict = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    };
    const requestOptions = {
      headers: new HttpHeaders(headersDict)
    };

    this.http.post(url, a )
      .subscribe(data => {
          console.log(data);
        },
        (err) => console.log(err),
        () => {
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
