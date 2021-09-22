import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
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
  constructor(
    private postService: PostService,
    private activateRoute: ActivatedRoute
  ) {
    this.postId = this.activateRoute.snapshot.params.id;
    this.postService.getPost(this.postId).subscribe(
      (post) => {
        this.post = post;
      },
      (error) => {
        throwError(error);
      }
    );
  }

  ngOnInit(): void {}
}
