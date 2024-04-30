import {
  FacebookLoginProvider,
  SocialAuthService,
} from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { ApiService, endpoints } from 'src/app/Config/api.service';
import { AuthApiService, endpointsAuth } from 'src/app/Config/auth-api.service';
import { login } from 'src/app/Reducer/MyAuthState/user.actions';
import { loginState } from 'src/app/Reducer/MyUserState/auth.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    taiKhoan: new FormControl('', [Validators.required]),
    matKhau: new FormControl('', [Validators.required]),
  });

  user!: any;
  loggedIn!: any;

  constructor(
    private cookie: CookieService,
    private apis: ApiService,
    private authApi: AuthApiService,
    private router: Router,
    private store: Store,
    private authService: SocialAuthService
  ) {}
  ngOnInit(): void {
    if (this.cookie.check('user') === false) {
      this.authService.authState.subscribe({
        next: (result) => {
          console.log(result);
          console.log(JSON.stringify(this.user));
          if (result !== null) {
            try {
              this.user = {
                email: `${result.email}`,
                firstName: `${result.firstName}`,
                lastName: `${result.lastName}`,
                avatar: `${result.photoUrl}`,
              };
              this.apis
                .post(endpoints.googleSignIn, this.user)
                .subscribe((data) => {
                  this.cookie.set('token', data.toString());
                  this.authApi
                    .get(endpointsAuth.currentUser)
                    .subscribe((data) => {
                      this.cookie.set('user', JSON.stringify(data));
                      this.store.dispatch(loginState.login({ user: data }));
                      console.log(this.cookie.check('user'));
                      this.router.navigate(['/']);
                    });
                });
            } catch (error) {
              console.log(error);
            }
          } else throw Error
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      try {
        this.apis
          .login(endpoints.login, this.loginForm.value)
          .subscribe((data) => {
            this.cookie.set('token', data.toString());
            // this.store.dispatch(login({token: data.toString()}))
            this.authApi.get(endpointsAuth.currentUser).subscribe((data) => {
              this.cookie.set('user', JSON.stringify(data));
              this.store.dispatch(loginState.login({ user: data }));

              console.log(this.cookie.check('user'));

              Swal.fire({
                icon: 'success',
                title: 'Congratulations',
                text: 'Chúc mừng bạn đã đăng nhập thành công',
              }).then((result) => {
                if (result.isConfirmed) {
                  this.router.navigate(['/']);
                }
              });
            });
          });

        // if(this.cookie.check('user') === true)
        // {
        //   this.router.navigate(['/']);
        //   alert("Bạn đã đăng nhập thành công")
        // } else
        // {
        //   alert("Hãy thử lại lần nữa")
        // }
      } catch (error) {
        console.log(error);
      }
    }
  }

  get taiKhoan() {
    return this.loginForm.get('taiKhoan');
  }

  get matKhau() {
    return this.loginForm.get('matKhau');
  }

  private controlValueError(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === null) {
        return null;
      } else {
        return { valuesInvalid: true };
      }
    };
  }
}
