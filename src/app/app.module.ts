import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DatePipe} from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import {PostService} from './services/post.service';
import {ReplyService} from './services/reply.service';
import {HomeService} from './services/home.service';
import { LoginComponent } from './login/login.component';
import {UserService} from './services/user.service';
import { ChatComponent } from './chat/chat.component';
import { CommentComponent } from './comment/comment.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatToolbarModule} from '@angular/material';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDividerModule} from '@angular/material/divider';
import { PostComponent } from './post/post.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import { MatTableModule } from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { GoogleChartsModule } from 'angular-google-charts';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatComponent,
    CommentComponent,
    PostComponent,
    LoginComponent,
    ToolbarComponent,
    DashboardComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatTabsModule,
    MatListModule,
    MatMenuModule,
    MatTableModule,
    MatDatepickerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    GoogleChartsModule,
    MatSelectModule

  ],
  providers: [PostService, ReplyService, HomeService, UserService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
