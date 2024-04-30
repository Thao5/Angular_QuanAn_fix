import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { AuthApiService, endpointsAuth } from 'src/app/Config/auth-api.service';
import { decrement, update } from 'src/app/Reducer/MyCartCounterState/counter.actions';
import { MyCartService } from 'src/app/Service/my-cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart-off',
  templateUrl: './cart-off.component.html',
  styleUrls: ['./cart-off.component.css']
})
export class CartOffComponent implements OnInit {
  carts!: any;
  hcarts!:any;
  idBan!: any;
  constructor(private cartService: MyCartService,
    private router: Router,
    private cookie: CookieService,
    private store:Store<{counter: {counter: number}}>,
    private authApi: AuthApiService
    ) { }

  Object = Object;
  ngOnInit(): void {
    if(this.cookie.check('cartOff') === true){
      this.carts = JSON.parse(this.cookie.get('cartOff'))
      console.log(this.carts)
    }
    console.log(this.carts)
    this.hcarts = this.cookie.check('cartOff')
  }

  deleteItem(item: any)
  {
    this.store.dispatch(decrement({ payload: item.soLuong }))
    if(item.idThucAn in this.carts)
    {
        delete this.carts[item.idThucAn];
        this.cookie.set('cart', JSON.stringify(this.carts));

        return this.carts;
    }
  }

  pay()
  {
    console.log(JSON.stringify(this.carts))
    this.authApi.post(endpointsAuth.payOff, this.carts).subscribe((res) => {
      this.carts = null
      this.cookie.delete('cartOff')
      this.store.dispatch(update({payload: 0}))
      Swal.fire({
        icon: 'success',
        title: 'Congratulations',
        text: 'Chúc mừng bạn đã đặt bàn thành công',
      }).then((result) => {
        if(result.isConfirmed)
        {
          this.router.navigate(['/']);
        }
      })
    })
    //   this.carts = null
    //   this.cookie.delete('cart')
    //   this.store.dispatch(update({payload: 0}))
    // })
  }
  // Back() {
  //   // this.router.navigate(['/chonban/', ])
  // }
}
