import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/Config/api.service';
import { AuthApiService, endpointsAuth } from 'src/app/Config/auth-api.service';
import { MyCartService } from 'src/app/Service/my-cart.service';

@Component({
  selector: 'app-danh-gia',
  templateUrl: './danh-gia.component.html',
  styleUrls: ['./danh-gia.component.css']
})
export class DanhGiaComponent implements OnInit {

  noiDung = new FormControl('');
  danhGia = new FormControl('');
  idCN!: any
  comment!: any
  user!: any
  huser!: any
  cont: any
  constructor(private apis: ApiService,
    private cookie: CookieService,
    private route: ActivatedRoute, private authAPI: AuthApiService,
    private datePipe: DatePipe
    ){

  }

  get content(){
    return this.noiDung.value;
  }

  ngOnInit(): void {
    this.idCN = parseInt(this.route.snapshot.paramMap.get("storeId") as any);
    if(this.cookie.check('user'))
    {
      this.user = JSON.parse(this.cookie.get('user'))
    }
    this.huser = this.cookie.check('user')
    this.authAPI.get(endpointsAuth.comments(this.idCN)).subscribe((data) => {
      this.comment = data
      console.log(this.comment)
    })
  }

  getCommentCreatedDate(comment: any) {
    return this.datePipe.transform(comment.createdDate, 'dd/MM/yyyy, HH:mm', 'vi');
  }

  onChange()
  {
    this.cont = this.noiDung.value
    console.log(this.noiDung.value)
  }

  addComment()
  {
    // console.log(this.cont)
    this.authAPI.post(endpointsAuth.addcomment, {
      "noiDung": this.cont,
      "idChiNhanh": this.idCN,
      "danhGia": this.danhGia.value,
      "idNguoiDung": this.user.id
    }).subscribe((data) => {
      // this.comment = Object.values(this.comment).unshift([data, ...this.comment])
      console.log(data)
      this.ngOnInit()
    })
  }
}
