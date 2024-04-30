import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/Config/api.service';

@Component({
  selector: 'app-thong-tin-ca-nhan',
  templateUrl: './thong-tin-ca-nhan.component.html',
  styleUrls: ['./thong-tin-ca-nhan.component.css']
})
export class ThongTinCaNhanComponent implements OnInit {

  user!: any
  constructor(private Apis:ApiService, private router: Router, private cookie: CookieService) {

  }
  ngOnInit(): void {
    this.user = JSON.parse(this.cookie.get('user'))
  }

  onClick() {
    this.router.navigate(['/'])
  }

}
