import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/comment/comment.service';
import { Post } from 'src/app/post/post.model';
import { Comment } from 'src/app/comment/comment.model';
import { PostService } from 'src/app/post/post.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styles: [],
})
export class UserProfileComponent implements OnInit {
  name: string;
  posts: Post[];
  comments: Comment[];
  postLength: number;
  commentLength: number;

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private activatedRoute: ActivatedRoute
  ) {
    this.name = this.activatedRoute.snapshot.params.name;

    this.postService.getAllPostsByUser(this.name).subscribe((post) => {
      this.posts = post;
      this.postLength = post.length;
    });

    this.commentService.getAllCommentsByUser(this.name).subscribe((comment) => {
      this.comments = comment;
      this.commentLength = comment.length;
    });
  }

  ngOnInit(): void {}
}
