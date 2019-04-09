import { Component, OnInit } from '@angular/core';
import { PostService} from '../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private postService: PostService) {}
  private newPost = {
    src: null,
    content: 'sample caption'
  };

  ngOnInit() {
    this.postService.getAllPostsFromDB();
    this.postService.getAllReactionsfromDB();
  }

  refresh() {
    this.postService.refresh();
  }
  getAllPosts() {
    const posts: HTMLCollectionOf<Element> = document.getElementsByClassName('cardsimg');
    if ( posts.length > 0 && this.postService.getAllPosts().length > 0) {
      for (let i = 0 ; i < posts.length ; i++) {
         posts[i].setAttribute('src', 'http://localhost:5000/InstaPost/images/' + this.postService.getAllPosts()[i].photourl);
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

}
