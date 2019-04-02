import { Component, OnInit } from '@angular/core';
import { PostService} from '../services/post.service';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private postService: PostService) {}
  private counter = 0;

  ngOnInit() {
    this.postService.getAllPostsFromDB();
  }

  getAllPosts() {
    const posts: HTMLCollectionOf<Element> = document.getElementsByClassName('cardsimg');
    if ( posts.length > 0 && this.postService.getAllPosts().length > 0) {
      for (let i = 0 ; i < posts.length ; i++) {
        posts[i].setAttribute('src', this.postService.getAllPosts()[i].photourl);
      }
    }
    return this.postService.getAllPosts();
  }

  addLike(one) {
    this.counter++;
    console.log(one);
  }

}
