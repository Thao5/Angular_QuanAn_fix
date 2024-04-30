import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService, endpoints } from 'src/app/Config/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup;
  loading: boolean = false;
  constructor(private fb: FormBuilder, private Apis:ApiService, private router: Router) {
    this.forgotForm = this.fb.group({
      email: [, [Validators.required, Validators.email]],
    });
  }

  get email() {
    return this.forgotForm.get('email')
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.forgotForm.invalid) {
      return;
    }

    this.loading = true;
    this.Apis.forgot(endpoints.forgotPass, this.forgotForm.value).subscribe((res) => {
      if(res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Congratulations',
          text: 'Chúc mừng bạn đã đổi mật khảu thành công, vui lòng kiểm tra email của bạn',
        }).then((result) => {
          if(result.isConfirmed)
          {
            this.router.navigate(['/login']);
          }
        })
      }else {
        Swal.fire({
          icon: 'error',
          title: 'Xin lỗi bạn...',
          text: 'Đã có lỗi xảy ra'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/forgot']);
          }
        })
      }


    });
  }
}
