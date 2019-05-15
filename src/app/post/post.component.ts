import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../services/post.service';
import { UserService} from "../services/user.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() chatId: number;

  constructor(private postService: PostService, private userService: UserService) {}

  private SIGNEDINUSERID;
  private SIGNEDINPERSONID;

  private userChatReactions;

  ngOnInit() {
    this.SIGNEDINPERSONID = this.userService.getCurrentUser().personId;
    this.SIGNEDINUSERID = this.userService.getCurrentUser().userId;

    this.postService.getPostsForChatIdFromDB(this.chatId);
    this.postService.getAllReactionsfromDB();
    this.postService.getAllRepliesFromDB();
    this.userChatReactions = this.postService.getChatReactionsMap();
  }

  private newPost = {
    chatId: null,
    userId: null,
    src: null,
    content: null,
    fileName: null
  };

  private fileToUpload = {
    name: null,
    media: {
     mimeType: null,
      body: null
    },
    size:null
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
    console.log(e.target.files[0]);

    const src = URL.createObjectURL(e.target.files[0]);
    x.setAttribute('src', src);
    this.newPost.src = e.target.files[0].name;
    console.log(this.newPost);

    const reader = new FileReader();

    this.fileToUpload.name = e.target.files[0].name;
    this.fileToUpload.media.mimeType = e.target.files[0].type;
    this.fileToUpload.media.body = reader.readAsBinaryString(e.target.files[0]);
    this.fileToUpload.size = e.target.files[0].size;

    // reader.onload((e) => {
    //   const contentType = fileData.type || 'application/octet-stream';
    //   const metadata = {
    //     title: fileData.fileName,
    //     mimeType: contentType
    //   };
    // });
    //
    // const base64Data = btoa(reader.result);

  }

  addPost() {
    this.newPost.chatId = this.chatId;
    this.newPost.userId = this.SIGNEDINUSERID;
    console.log(this.newPost);
    this.postService.addPostToDB(this.newPost);
    this.newPost.src = null;
    this.newPost.content = null;
  }

  addReaction(postId, messageId, reactionType){
    // if(this.userChatReactions.has(messageId)){
    //   if(this.userChatReactions.get(messageId)==reactionType){
    //     const reaction = {
    //       userId: this.SIGNEDINUSERID,
    //       messageId: messageId,
    //     }
    //     this.postService.deleteReaction(reaction);
    //   } else{
    //     //delete reaction and add new one
    //   }
    // }else{
    //   const newReaction = {
    //     userId: this.SIGNEDINUSERID,
    //     postId: postId,
    //     messageId: messageId,
    //     reactionType: reactionType
    //   };
    //   console.log(newReaction);
    //   this.postService.addReactionToDB(newReaction);
    // }
    const newReaction = {
      userId: this.SIGNEDINUSERID,
      postId: postId,
      messageId: messageId,
      reactionType: reactionType
    };
    console.log(newReaction);
    this.postService.addReactionToDB(newReaction);
  }

  userAlreadyReacted(messageId, reactionType){
    if(this.userChatReactions.has(messageId)){
      var type = this.userChatReactions.get(messageId);
      if(type == reactionType) return true;
      else return false;
    } else return false;
  }
  existReaction(messageId){
    return this.userChatReactions.has(messageId);
  }
}
