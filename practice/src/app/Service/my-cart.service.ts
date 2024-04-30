import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MyCartService {
  private carts: any = {};
  private cartsSubject = new BehaviorSubject<any>({});
  counterdisplay!:any

  constructor(private cookie: CookieService, private store: Store<{counter: {counter: number}}>) {

  }

  getCart(): any {
    return this.carts;
  }

  getCounter() {
    this.store.select('counter').subscribe(data => {
      // data.counter = this.cartService.countCart()
      return this.counterdisplay = data.counter
    })
  }

  Object = Object

  countCart(): number {
    const cart:any = this.cookie.get('cart') || null;
    if(this.cookie.check('cart') === true)
    {
      return Object.values(cart).reduce((init, current:any) => init + current["quantity"], 0) as number;
    }
    return 0;
  }

  addToCart(product: any) {
    if (product.id in this.carts) {
      this.carts[product.id].quantity += 1;
    } else {
      this.carts[product.id] = {
        id: product.id,
        name: product.name,
        quantity: 1,
        unitPrice: product.price
      };
    }
    this.cookie.set('cart', JSON.stringify(this.carts));
    this.cartsSubject.next(this.carts);
  }

  updateItem(item: any) {
    this.carts[item.id].quantity = item.quantity;

    this.cartsSubject.next(this.carts);
  }

  deleteItem(item: any) {
    delete this.carts[item.id];

    this.cartsSubject.next(this.carts);
  }

  getCartSubject(): Observable<any> {
    return this.cartsSubject.asObservable();
  }

  pay()
  {

  }
}
