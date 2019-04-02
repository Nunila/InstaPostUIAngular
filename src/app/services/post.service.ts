import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';

interface Post {
  postid: number;
  chatid: number;
  userid: number;
  photourl: string;
  postdate: string;
}


@Injectable({
  providedIn: 'root'
})
export class PostService {

  mainUrl = `http://localhost:5000/InstaPost`;
  private allPosts: Post[] = new Array();

  constructor(private http: HttpClient) { }

  addPost(newPost){
    const post: Post = {
      postid: null,
      chatid: null,
      userid:null,
      photourl: newPost.src,
      postdate: new Date().toString()
    };
    this.allPosts.push(post);
  }

  getAllPosts() {
    return this.allPosts;
  }

  getAllPostsFromDB() {
    const url =  this.mainUrl + `/posts`;
    const headersDict = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    };
    const requestOptions = {
      headers: new HttpHeaders(headersDict)
    };

    this.http.get(url, requestOptions)
      .subscribe(data => {
        const asd = data as Post[];
        this.allPosts = asd;
      },
        (err) => console.log(err),
        () => {
        }
    );
  }

}
