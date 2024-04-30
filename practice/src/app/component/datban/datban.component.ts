import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService, endpoints } from 'src/app/Config/api.service';
import { AuthApiService, endpointsAuth } from 'src/app/Config/auth-api.service';

@Component({
  selector: 'app-datban',
  templateUrl: './datban.component.html',
  styleUrls: ['./datban.component.css']
})
export class DatbanComponent implements OnInit {

  idChiNhanh !: any
  ban!:any
  user!: any
  loading!:any
  constructor(private route: ActivatedRoute, private authAPI: AuthApiService, private API: ApiService, private cookie:CookieService,
    private rotuer: Router
    ) {}

  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get("idChiNhanh") as any);
    this.idChiNhanh = id;
    this.loading = true
    this.API.get(endpoints.chiNhanh(this.idChiNhanh)).subscribe((data) => {
      this.ban = data
      this.loading = false
    })
    this.user = this.cookie.check('user')
    console.log(this.user)
  }

  chonBan(idBan: any){
    this.rotuer.navigate([`/datban/${this.idChiNhanh}/ban/`, idBan])
  }
}
