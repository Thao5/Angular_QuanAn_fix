import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService, endpoints } from 'src/app/Config/api.service';
import { MySpinnerComponent } from 'src/app/layout/my-spinner/my-spinner.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  registerForm: FormGroup;
  err: string | null = null;
  loading: boolean = false;
  avatar: File | null | undefined = null;

  constructor(private fb: FormBuilder, private Apis:ApiService, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: [, Validators.required],
      lastName: [, Validators.required],
      email: [, [Validators.required, Validators.email]],
      phone: [, Validators.required],
      username: [, Validators.required],
      password: [, Validators.required],
      confirmPass: [, Validators.required]
    }, {
      validators: this.controlValueError('password', 'confirmPass')
    });
  }

  get firstName() {
    return this.registerForm.get('firstName')
  }

  get lastName() {
    return this.registerForm.get('lastName')
  }

  get email() {
    return this.registerForm.get('email')
  }

  get phone() {
    return this.registerForm.get('phone')
  }

  get username() {
    return this.registerForm.get('username')
  }

  get password() {
    return this.registerForm.get('password')
  }

  get confirmPass() {
    return this.registerForm.get('confirmPass')
  }

  ngOnInit(): void {
  }

  register(event: Event) {
    event.preventDefault();
    if (this.registerForm.invalid || this.registerForm.value.password !== this.registerForm.value.confirmPass) {
      return;
    }

    this.loading = true;

    const formData = new FormData();
    for (const field in this.registerForm.value) {
      if (field !== 'confirmPass') {
        formData.append(field, this.registerForm.value[field]);
      }
    }

    if (this.avatar) {
      formData.append('avatar', this.avatar);
    }

    console.log(formData)
    this.Apis.post(endpoints.register, formData)
      .subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Congratulations',
            text: 'Chúc mừng bạn đã đăng ký thành công',
          }).then((result) => {
            if(result.isConfirmed)
            {
              this.router.navigate(['/login']);
            }
          })
        }
      );
  }

  onFileChange(event: Event) {
    this.avatar = (event.target as HTMLInputElement).files?.[0];
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
