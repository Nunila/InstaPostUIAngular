import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import {PostService} from './services/post.service';
import {ReplyService} from './services/reply.service';

import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatToolbarModule} from '@angular/material';
import { ChatComponent } from './chat/chat.component';
import { CommentComponent } from './comment/comment.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatBottomSheetModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [PostService, ReplyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
