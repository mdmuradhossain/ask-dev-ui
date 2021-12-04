import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CreateCategoryComponent } from './category/create-category/create-category.component';
import { HomeComponent } from './home/home.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { PostComponent } from './post/post.component';
import { ViewPostComponent } from './post/view-post/view-post.component';

const routes: Routes = [
  { path: 'sign-up', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'posts',
    component: PostComponent,
  },
  {
    path: 'posts/add',
    component: CreatePostComponent,
  },
  {
    path: 'categories/add',
    component: CreateCategoryComponent,
  },
  {
    path: 'categories',
    component: CategoryListComponent,
  },

  {
    path: 'view-post/:slug/:id',
    component: ViewPostComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
