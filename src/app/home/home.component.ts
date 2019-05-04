import { Component, OnInit } from '@angular/core';
import { PostService} from '../services/post.service';
import {HomeService} from '../services/home.service';
import Swal from 'sweetalert2';
import {MatCheckbox} from '@angular/material';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private postService: PostService, private homeService: HomeService, private userService: UserService) {}
  SIGNEDINUSER = this.homeService.SIGNEDINUSER;
  private newPost = {
    src: null,
    content: 'sample caption'
  };
  private newChat = {
    chatName : 'SomeChatName',
    members : [],
    creationDate : new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDay(),
    ownerId : this.SIGNEDINUSER
  };

  ngOnInit() {
    // this.postService.getAllPostsFromDB();
    // this.postService.getAllReactionsfromDB();
    // this.postService.getAllRepliesFromDB();
    this.homeService.getChatsOfUserFromDB(this.SIGNEDINUSER);
    this.homeService.getContactsOfUserFromDB(this.SIGNEDINUSER);
  }

  boxchecked(e) {
    if (e.checked) this.newChat.members.push(e.source.value);
    else {
      const i = this.newChat.members.findIndex(mem => mem === e.source.value );
      this.newChat.members.splice(i, 1);
    }
  }

  isUserOwnerOfChat(ownerId) {
    return ownerId === this.SIGNEDINUSER;
  }

  getChats() {
    return this.homeService.getChatsOfUser();
  }

  getContacts() {
    return this.homeService.getContactsOfUser();
  }
  refresh() {
    this.postService.refresh();
  }
  getAllPosts() {
    const posts: HTMLCollectionOf<Element> = document.getElementsByClassName('cardsimg');
    if ( posts.length > 0 && this.postService.getAllPosts().length > 0) {
      for (let i = 0 ; i < posts.length ; i++) {
        if (this.postService.getAllPosts()[i].postId === null) {
          posts[i].setAttribute('src', this.postService.getAllPosts()[i].photourl);
        } else {
          posts[i].setAttribute('src', 'http://localhost:5000/InstaPost/images/' + this.postService.getAllPosts()[i].photourl);
        }
      }
    }
    return this.postService.getAllPosts();
  }

  getReactionsMap(messageId) {
    return this.postService.getReactionsMap(messageId);
  }

  loadFile(e) {
    const x = document.getElementById('preview');
    const src = URL.createObjectURL(e.target.files[0]);
    x.setAttribute('src', src);
    this.newPost.src = src;
    console.log(this.newPost);
  }

  addPost() {
    this.postService.addPost(this.newPost);
  }

  addChat() {
    this.homeService.addChat(this.newChat);
    this.newChat = {
      chatName : 'SomeChatName',
        members : [],
        creationDate : new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDay(),
        ownerId : this.SIGNEDINUSER
    };
    const a = document.getElementsByTagName('mat-checkbox');
    for (let i = 0; i < a.length; i++) {
      a[i].className = 'mat-checkbox mat-accent ng-star-inserted';
    }
  }

  deleteChat(chatid) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You wont be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.homeService.deleteChat(chatid);
      }
    });
  }

}
