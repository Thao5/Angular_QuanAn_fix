import { Component, Input, OnInit, inject } from '@angular/core';
import { ApiService, endpoints } from '../Config/api.service';
import { Store } from '@ngrx/store';
import { increment } from '../Reducer/MyCartCounterState/counter.actions';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css'],
})
export class FoodDetailComponent implements OnInit {
  constructor(private apis: ApiService,
    private cookie: CookieService,
    private store:Store<{counter: {counter: number}}>,
    private route: ActivatedRoute
    ){

  }

  food!: any;
  user!: any;
  quantity: number = 1;
  hFood: boolean = false
  private carts: any = {};
  async ngOnInit(): Promise<void> {
    // this.apis.get(endpoints.food_detail(7)).subscribe((data) => {
    //   this.food = data;
    //   this.hFood = true
    //   console.log(this.food);
    // });
    let id = parseInt(this.route.snapshot.paramMap.get("idFood") as any);

    let data = await this.apis.getFood(endpoints.food_detail(id))
    this.food = data
    if(this.food !== null) this.hFood = true
    if(this.cookie.check('user') === true){
      this.user = JSON.parse(this.cookie.get('user'))
    }
    if(this.cookie.check('cart-foodapp') === true) {
      this.carts = JSON.parse(this.cookie.get('cart-foodapp'))
    }
  }

  getvalue(val: any) {
    console.log(val);
  }

  onPlus() {
    this.quantity = this.quantity + 1;
    if (this.quantity <= 0) this.quantity = 1;
  }

  onMinus() {
    this.quantity = this.quantity - 1;
    if (this.quantity <= 0) this.quantity = 1;
  }

  addCart(product: any) {
    this.store.dispatch(increment({ payload: this.quantity }));

    console.log(product.image)
    console.log(this.quantity)
    if(this.carts !== null) {
      if (product.id in this.carts) {
        console.log(this.carts[product.id].soLuong)
        this.carts[product.id].soLuong = this.carts[product.id].soLuong + this.quantity -1
        console.log(this.carts[product.id].soLuong + this.quantity)
        console.log(this.carts[product.id].soLuong += this.quantity)
        console.log(this.carts)
      } else {
        this.carts = {
          ...this.carts,
          [product.id]: {
            ...this.carts[product.id],
            "idThucAn": product.id,
            "name": product.name,
            'soLuong': this.quantity,
            "donGia": product.price
          }
        }
      }
      this.cookie.set('cart-foodapp', JSON.stringify(this.carts));
    }



    // if (product.id in this.carts) {
      // this.carts[product.id].soLuong += this.quantity;
    // } else {
    //   this.carts[product.id] = {
    //     idNguoiDung: this.user.id,
    //     idThucAn: product.id,
    //     name: product.name,
    //     soLuong: this.quantity,
    //     donGia: product.price,
    //   };
    // }
    // this.cookie.set('cart-foodapp', JSON.stringify(this.carts));
    // console.log(this.cookie.get('cart-foodapp'))
  }
}
