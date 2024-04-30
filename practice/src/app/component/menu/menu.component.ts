import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { ApiService, endpoints } from 'src/app/Config/api.service';
import { increment } from 'src/app/Reducer/MyCartCounterState/counter.actions';
import { MyCartService } from 'src/app/Service/my-cart.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  loading!: any
  public foods:any = [];
  count:number = 1;
  private carts: any = {};
  user:any = [];
  constructor(private apis: ApiService,
    private store:Store<{counter: {counter: number}}>,
     private cartService: MyCartService,
     private cookie: CookieService,
    ){

  }
  async ngOnInit(): Promise<void> {
    this.loading = true
    // this.apis.get(endpoints.foods).subscribe((data) => {
    //   this.foods = data
    //   this.loading = false
    // })
    let data = await this.apis.getFood(endpoints.foods)
    this.foods = data
    if(this.foods !== null) this.loading = false
    if(this.foods === null) this.loading = true
    if(this.cookie.check('user') === true){
      this.user = JSON.parse(this.cookie.get('user'))
    }
  }
  addCart(product: any)
  {
    this.store.dispatch(increment({ payload: this.count }));
    if (product.id in this.carts) {
      this.carts[product.id].soLuong += 1;
    } else {
      this.carts[product.id] = {
        idNguoiDung: this.user.id,
        idThucAn: product.id,
        name: product.name,
        soLuong: 1,
        donGia: product.price
      };
    }
    this.cookie.set('cart', JSON.stringify(this.carts));
  }
}
