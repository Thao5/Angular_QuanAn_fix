import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { endpoints } from 'src/app/Config/api.service';
import { AuthApiService, endpointsAuth } from 'src/app/Config/auth-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePassForm: FormGroup;
  loading: boolean = false;
  user!: any
  tk!: string
  constructor(private fb: FormBuilder, private authApi:AuthApiService, private router: Router, private cookie: CookieService) {
    this.changePassForm = this.fb.group({
      taiKhoan: [{value: this.user,disabled: true}, Validators.required],
      matKhauMoi: [, Validators.required],
      confirmPass: [, Validators.required]
    }, {
      validators: this.controlValueError('matKhauMoi', 'confirmPass')
    });
  }
  ngOnInit(): void {
    this.user = JSON.parse(this.cookie.get('user'))
    this.changePassForm.patchValue({taiKhoan: this.user.taiKhoan})
  }

  get taiKhoan() {
    return this.changePassForm.get('taiKhoan')
  }

  get matKhauMoi() {
    return this.changePassForm.get('matKhauMoi')
  }

  get confirmPass() {
    return this.changePassForm.get('confirmPass')
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.changePassForm.invalid) {
      return;
    }
    // this.changePassForm.patchValue({taiKhoan: this.user.taiKhoan})
    this.loading = true;
    console.log(this.changePassForm.getRawValue)
    this.authApi.post(endpointsAuth.changePassword, this.changePassForm.getRawValue()).subscribe((res) => {
      if(res.status === 200)
      {
        Swal.fire({
          icon: 'success',
          title: 'Congratulations',
          text: 'Chúc mừng bạn đã đổi mật khảu thành công',
        }).then((result) => {
          if(result.isConfirmed)
          {
            this.router.navigate(['/']);
          }
        })
      }else {
        Swal.fire({
          icon: 'error',
          title: 'Xin lỗi bạn...',
          text: 'Đã có lỗi xảy ra'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/changepw']);
          }
        })
      }
    })
  }

  private controlValueError(controlNameA: string, controlNameB: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>  {
      const formGroup = control as FormGroup
      const valueOfControlA = formGroup.get(controlNameA)?.value
      const valueOfControlB = formGroup.get(controlNameB)?.value

      if (valueOfControlA === valueOfControlB) {
        return null;
      }else {
        return {valuesNotMatch: true}
      }

    }
  }
}
