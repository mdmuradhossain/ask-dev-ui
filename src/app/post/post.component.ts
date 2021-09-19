import { Component, OnInit } from '@angular/core';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { Post } from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  posts$: Post[];
  faComments = faComments;
  constructor(private postService: PostService) {
    this.postService.getAllPosts().subscribe((post) => {
      this.posts$ = post;
    });
  }

  ngOnInit(): void {}
}
