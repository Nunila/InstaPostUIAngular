import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';

interface Chat {
  chatId: number;
  chatName: string;
  creationDate: string;
  ownerId: number
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

  getChatsOfUser() {
    return this.chatsOfUser;
  }

  getChatsOfUserFromDB(uid) {
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
