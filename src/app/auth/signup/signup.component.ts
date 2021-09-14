import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { RegisterRequest } from './register-request';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  registerRequest: RegisterRequest;
  signupForm: FormGroup;
  constructor(private authService: AuthService) {
    this.registerRequest = {
      username: '',
      email: '',
      password: '',
    };
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  signUp() {
    this.registerRequest.username = this.signupForm.get('username').value;
    this.registerRequest.email = this.signupForm.get('email').value;
    this.registerRequest.password = this.signupForm.get('password').value;

    this.authService.signUp(this.registerRequest).subscribe((data) => {
      console.log(data);
    });
  }
}
