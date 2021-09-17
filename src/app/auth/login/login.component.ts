import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from './login-request';
import { LoginResponse } from './login-response';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginRequest: LoginRequest;
  registeredSuccessMessage: string;
  isError: boolean;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginRequest = {
      username: '',
      password: '',
    };
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.registered !== undefined && params.registered === 'true') {
        this.toastr.success('Registration Successful');
        this.registeredSuccessMessage =
          'Please Check your inbox for activation email activate your account before you Login!';
      }
    });
  }

  login() {
    this.loginRequest.username = this.loginForm.get('username').value;
    this.loginRequest.password = this.loginForm.get('password').value;

    this.authService.login(this.loginRequest).subscribe((data) => {
      // console.log('Login Successful');
      if (data) {
        this.isError = false;
        this.router.navigateByUrl('/');
        this.toastr.success('Login Successfull');
      } else {
        this.isError = true;
      }
    });
  }
}
