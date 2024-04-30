import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { ApiService, endpoints } from 'src/app/Config/api.service';
import { increment } from 'src/app/Reducer/MyCartCounterState/counter.actions';
import { MyCartService } from 'src/app/Service/my-cart.service';

@Component({
  selector: 'app-datmon-offline',
  templateUrl: './datmon-offline.component.html',
  styleUrls: ['./datmon-offline.component.css']
})
export class DatmonOfflineComponent implements OnInit {
  public foods:any = [];
  loading!: any
  count: any = 1;
  carts:any = {}
  idBan!: any
  constructor(private apis: ApiService,
    private cookie: CookieService,
    private store:Store<{counter: {counter: number}}>,
    private cartService: MyCartService,
    private route: ActivatedRoute
    ){

  }
  ngOnInit(): void {
    this.idBan = parseInt(this.route.snapshot.paramMap.get("idBan") as any);
    console.log(this.idBan)
    this.loading = true
    this.apis.get(endpoints.foods).subscribe((data) => {
      this.foods = data
      this.loading = false
    })
  }

  addCart(product: any)
  {
    this.store.dispatch(increment({ payload: this.count }));
    if (product.id in this.carts) {
      this.carts[product.id].soLuong += 1;
    } else {
      this.carts[product.id] = {
        idBan: this.idBan,
        idThucAn: product.id,
        name: product.name,
        soLuong: 1,
        donGia: product.price
      };
    }
    this.cookie.set('cartOff', JSON.stringify(this.carts));
    console.log(JSON.parse(this.cookie.get('cartOff')))
  }
}
