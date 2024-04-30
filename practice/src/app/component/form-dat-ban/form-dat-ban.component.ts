import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService, endpoints } from 'src/app/Config/api.service';
import { AuthApiService, endpointsAuth } from 'src/app/Config/auth-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-dat-ban',
  templateUrl: './form-dat-ban.component.html',
  styleUrls: ['./form-dat-ban.component.css']
})
export class FormDatBanComponent implements OnInit {
  datBanForm!: FormGroup;
  constructor(private route: ActivatedRoute, private cookie: CookieService, private fb: FormBuilder, private authAPi: AuthApiService, private API: ApiService,
    private router: Router
  ) {
  }
  loading: boolean = false
  idCN!: any
  idB!: any
  ban!: any
  user!: any
  datefor!: any
  moTaBan!: any
  hoTen!: any
  ngOnInit(): void {
    let idChiNhanh = parseInt(this.route.snapshot.paramMap.get('idChiNhanh') as any)
    let idBan = parseInt(this.route.snapshot.paramMap.get('idBan') as any)
    this.idCN = idChiNhanh
    this.idB = idBan
    this.user = JSON.parse(this.cookie.get('user'))
    this.hoTen = `${this.user.lastName} ${this.user.firstName}`
    this.ban = this.API.get(endpoints.ban(this.idB)).subscribe((data) => {
      this.ban = data
      this.moTaBan = this.ban.moTa
      let date = new Date(Date.now())
      let formattedDate = `${date.toLocaleDateString()}-${date.toLocaleTimeString()}`;
      this.datefor = date
      this.datBanForm = this.fb.group({
        moTaBan: [{ value: this.ban.moTa, disabled: true }, Validators.required],
        hoTen: [{ value: `${this.user.lastName} ${this.user.firstName}`, disabled: true }, Validators.required],
        idNguoiDat: [{ value: this.user.firstName, disabled: true }, Validators.required],
        idChiNhanh: [{ value: this.idCN, disabled: true }, Validators.required],
        idBan: [{ value: this.idB, disabled: true }, Validators.required],
        moTa: [, [Validators.required]],
        ngayDat: [{ value: formattedDate, disabled: true }, Validators.required],
        ngayNhan: [, Validators.required]
      }, {
        validators: this.controlValueError('ngayDat', 'ngayNhan')
      });
      console.log(date)
    })

    let date = new Date(Date.now())
    let formattedDate = `${date.toLocaleDateString()}-${date.toLocaleTimeString()}`;
    this.datefor = date
    this.datBanForm = this.fb.group({
      moTaBan: [{ value: this.ban.moTa, disabled: true }, Validators.required],
      hoTen: [{ value: `${this.user.lastName} ${this.user.firstName}`, disabled: true }, Validators.required],
      idNguoiDat: [{ value: this.user.firstName, disabled: true }, Validators.required],
      idChiNhanh: [{ value: this.idCN, disabled: true }, Validators.required],
      idBan: [{ value: this.idB, disabled: true }, Validators.required],
      moTa: [, [Validators.required]],
      ngayDat: [{ value: formattedDate, disabled: true }, Validators.required],
      ngayNhan: [, Validators.required]
    },{
      validators: this.controlValueError('ngayDat', 'ngayNhan')
    } );
    console.log(date)
    // this.datBanForm.get('idChiNhanh')?.disable()
    // this.datBanForm.get('idBan')?.disable()
  }

  get mt()
  {
    return this.datBanForm.get('moTa')
  }

  get nn()
  {
    return this.datBanForm.get('ngayNhan')
  }

  datBan(event: Event) {
    event.preventDefault();
    // if (this.datBanForm.invalid) {
    //   return;
    // }
    console.log(this.datBanForm.getRawValue())
    // this.datBanForm.setValue("")
    this.datBanForm.patchValue({ ngayDat: this.datefor })
    this.datBanForm.patchValue({ idNguoiDat: this.user.id })
    // console.log(this.datBanForm.getRawValue())
    // console.log(JSON.stringify(this.datBanForm.getRawValue))

    this.authAPi.post(endpointsAuth.datban, this.datBanForm.getRawValue()).subscribe((res) => {
      this.loading = true;
      console.log(res.status)
      if (res.status === 202) {
        Swal.fire({
          icon: 'error',
          title: 'Xin lỗi bạn...',
          text: 'Bàn này đã được đặt rồi'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/']);
          }
        })

      }
      else {
        Swal.fire({
          icon: 'success',
          title: 'Congratulations',
          text: 'Chúc mừng bạn đã đặt bàn thành công',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/']);
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

      if (new Date(valueOfControlA) < new Date(valueOfControlB)) {
        return null;
      }else {
        return {valuesError: true}
      }

    }
  }
}
