import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, endpoints } from 'src/app/Config/api.service';

@Component({
  selector: 'app-chon-ban',
  templateUrl: './chon-ban.component.html',
  styleUrls: ['./chon-ban.component.css']
})
export class ChonBanComponent implements OnInit {
  constructor(private route: ActivatedRoute, private rotuer: Router, private API: ApiService, ) {}
  loading!:any
  ban!:any
  ngOnInit(): void {
    this.loading = true
    this.API.get(endpoints.chiNhanh(4)).subscribe((data) => {
      this.ban = data
      this.loading = false
    })
  }

  chonBan(idBan: any){
    this.rotuer.navigate([`/chonban/`, idBan])
  }

}
