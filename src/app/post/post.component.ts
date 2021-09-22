import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { Post } from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() posts$: Post[];
  faComments = faComments;
  constructor(private postService: PostService, private router: Router) {
    this.postService.getAllPosts().subscribe((post) => {
      this.posts$ = post;
    });
  }

  ngOnInit(): void {}

  goToPost(id: number): void {
    this.router.navigateByUrl('/view-post/' + id);
  }
}
