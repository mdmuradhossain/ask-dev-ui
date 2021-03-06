import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptor } from './auth/token-interceptor';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { VoteButtonComponent } from './vote-button/vote-button.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { CategorySideBarComponent } from './category-side-bar/category-side-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreateCategoryComponent } from './category/create-category/create-category.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ViewPostComponent } from './post/view-post/view-post.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    PostComponent,
    VoteButtonComponent,
    SideBarComponent,
    CategorySideBarComponent,
    CreateCategoryComponent,
    CreatePostComponent,
    CategoryListComponent,
    ViewPostComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    FontAwesomeModule,
    EditorModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
