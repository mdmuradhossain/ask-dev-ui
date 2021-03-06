import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  username: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // this.authService.loggedIn.subscribe((data: boolean) => {
    //   this.isLoggedIn = data;
    // });
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUsername();
  }

  goToUserProfile() {
    this.router.navigateByUrl('/user-profile/' + this.username);
  }

  logOut() {
    this.authService.logOut();
    this.isLoggedIn = false;
    this.router.navigateByUrl('');
  }
}
