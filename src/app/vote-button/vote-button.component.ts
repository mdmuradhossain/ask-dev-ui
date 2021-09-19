import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post/post.model';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css'],
})
export class VoteButtonComponent implements OnInit {
  @Input() post: Post;
  constructor() {}

  ngOnInit(): void {}
}
