import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { Category } from 'src/app/category/category.model';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { CategoryService } from 'src/app/category/category.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  createPostForm: FormGroup;
  post: Post;
  categories: Category[];

  constructor(
    private router: Router,
    private postService: PostService,
    private categoryService: CategoryService
  ) {
    this.post = {
      questionName: '',
      description: '',
      categoryName: '',
      url: '',
    };
  }

  ngOnInit(): void {
    this.createPostForm = new FormGroup({
      questionName: new FormControl('', Validators.required),
      categoryName: new FormControl('', Validators.required),
      description: new FormControl(''),
      url: new FormControl(''),
    });
    this.categoryService.getAllCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        throwError(error);
      }
    );
  }

  createPost() {
    this.post.questionName = this.createPostForm.get('questionName').value;
    this.post.categoryName = this.createPostForm.get('categoryName').value;
    this.post.description = this.createPostForm.get('description').value;
    this.post.url = this.createPostForm.get('url').value;

    this.postService.createPost(this.post).subscribe(
      (data) => {
        this.router.navigateByUrl('/');
      },
      (error) => {
        throwError(error);
      }
    );
  }

  discardPost() {
    this.router.navigateByUrl('/');
  }
}
