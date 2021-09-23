import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { CommentService } from 'src/app/comment/comment.service';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css'],
})
export class ViewPostComponent implements OnInit {
  postId: number;
  post: Post;
  commentForm: FormGroup;
  comment: Comment;
  comments: Comment[];

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private activateRoute: ActivatedRoute
  ) {
    this.postId = this.activateRoute.snapshot.params.id;

    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required),
    });
    this.comment = {
      postId: this.postId,
      text: '',
    };
  }

  ngOnInit(): void {
    this.getPostById();
    this.getCommentsForPost();
  }

  getPostById() {
    this.postService.getPost(this.postId).subscribe(
      (post) => {
        this.post = post;
      },
      (error) => {
        throwError(error);
      }
    );
  }

  postComment() {
    this.comment.text = this.commentForm.get('text').value;
    this.commentService.postComment(this.comment).subscribe(
      (comment) => {
        this.commentForm.get('text').setValue('');
        this.getCommentsForPost();
      },
      (err) => {
        throwError(err);
      }
    );
  }

  getCommentsForPost() {
    this.commentService.getAllCommentsForPost(this.postId).subscribe(
      (data) => {
        this.comments = data;
      },
      (err) => {
        throwError(err);
      }
    );
  }
}
