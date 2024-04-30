import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AuthApiService, endpointsAuth } from 'src/app/Config/auth-api.service';
import {
  decrement,
  update,
} from 'src/app/Reducer/MyCartCounterState/counter.actions';
import { MyCartService } from 'src/app/Service/my-cart.service';
import Swal from 'sweetalert2';

declare var paypal: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement!: ElementRef;
  @Input() c!: any;
  carts!: any;
  hcarts!: any;
  quantityControl = new FormControl();
  user!: any;
  huser!: any;
  constructor(
    private cartService: MyCartService,
    private router: Router,
    private cookie: CookieService,
    private store: Store<{ counter: { counter: number } }>,
    private authApi: AuthApiService
  ) {}
  // carts$!: Observable<any>;
  Object = Object;

  paidFor = false;
  sum: number = 0;
  itemsArray: any = [];

  async ngOnInit(): Promise<void> {
    if (this.cookie.check('cart-foodapp') === true) {
      this.carts = JSON.parse(this.cookie.get('cart-foodapp'));
      console.log(this.carts);
    }

    for (let c in this.carts) {
      this.sum += this.carts[c].donGia * this.carts[c].soLuong;
      console.log(this.sum);
    }

    //item of paypal
    let itemA = [];
    for (let c in this.carts) {
      itemA.push({
        name: this.carts[c].name,
        quantity: this.carts[c].soLuong,
        description: this.carts[c].name,
        image_url: this.carts[c].image,
        unit_amount: {
          currency_code: 'USD',
          value: this.carts[c].donGia,
        },
      });
      this.itemsArray = itemA;
    }
    console.log('StackOverFow', this.itemsArray);
    //...

    // console.log(this.carts);
    this.hcarts = this.cookie.check('cart-foodapp');
    console.log(this.hcarts);
    if (this.cookie.check('user') === true) {
      this.user = JSON.parse(this.cookie.get('user'));
    }
    this.huser = this.cookie.check('user');
    paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            intent: 'CAPTURE',
            payer: {
              name: {
                given_name: `${this.user.firstName}`,
                surname: `${this.user.lastName}`,
              },
              address: {
                address_line_1: '123 Main St.',
                admin_area_2: 'Anytown',
                admin_area_1: 'CA',
                postal_code: '12345',
                country_code: 'US',
              },
            },
            purchase_units: [
              {
                // reference_id: 'Reference_ID_L2L32',
                description: 'Description of PU',
                custom_id: `${this.user.id}`,
                soft_descriptor: 'Purchase Descriptor',
                // invoice_id: 'INV_202302011234',
                // supplementary_data: {
                //   card: {
                //     level_2: {
                //       invoice_id: 'INV_202302011234',
                //       tax_total: {
                //         currency_code: 'USD',
                //         value: 5.2,
                //       },
                //     },
                //     level_3: {
                //       shipping_amount: {
                //         currency_code: 'USD',
                //         value: 1.17,
                //       },
                //       duty_amount: {
                //         currency_code: 'USD',
                //         value: 1.16,
                //       },
                //       discount_amount: {
                //         currency_code: 'USD',
                //         value: 1.15,
                //       },
                //       shipping_address: {
                //         address_line_1: '123 Main St.',
                //         admin_area_2: 'Anytown',
                //         admin_area_1: 'CA',
                //         postal_code: '12345',
                //         country_code: 'US',
                //       },
                //       ships_from_postal_code: '12345',
                //       line_items: [
                //         {
                //           name: 'Item1',
                //           description: 'Description of Item1',
                //           upc: {
                //             type: 'UPC-A',
                //             code: '001004697',
                //           },
                //           unit_amount: {
                //             currency_code: 'USD',
                //             value: 9.5,
                //           },
                //           tax: {
                //             currency_code: 'USD',
                //             value: 5.12,
                //           },
                //           discount_amount: {
                //             currency_code: 'USD',
                //             value: 1.11,
                //           },
                //           total_amount: {
                //             currency_code: 'USD',
                //             value: 95.1,
                //           },
                //           unit_of_measure: 'POUND_GB_US',
                //           quantity: 10,
                //           commodity_code: 98756,
                //         },
                //       ],
                //     },
                //   },
                // },
                amount: {
                  currency_code: 'USD',
                  value: this.sum,
                  breakdown: {
                    item_total: {
                      currency_code: 'USD',
                      value: this.sum,
                    },
                  },
                },

                items: this.itemsArray,
                shipping: {
                  address: {
                    address_line_1: '123 Main St.',
                    admin_area_2: 'Anytown',
                    admin_area_1: 'CA',
                    postal_code: '12345',
                    country_code: 'US',
                  },
                },
              },
            ],
          });
        },
        onApprove: async (data: any, actions: any) => {
          const order = await actions.order.capture();
          console.log(order);
          this.paidFor = true;
          this.carts = null;
          this.cookie.delete('cart-foodapp');
          this.store.dispatch(update({ payload: 0 }));
          this.router.navigate(['/']);
        },
        onError: (err: any) => {
          console.log(err);
        },
      })
      .render(this.paypalElement.nativeElement);
  }

  deleteItem(item: any) {
    this.store.dispatch(decrement({ payload: item.soLuong }));
    if (item.idThucAn in this.carts) {
      delete this.carts[item.idThucAn];
      this.cookie.set('cart-foodapp', JSON.stringify(this.carts));

      return this.carts;
    }
  }

  updateItem(itemId: number) {}

  update(itemId: any, value: any) {
    console.log(itemId);
    this.carts = {
      ...this.carts,
      [itemId]: {
        ...this.carts[itemId],
        soLuong: parseInt(value),
      },
    };

    // console.log(this.carts)
    this.cookie.set('cart-foodapp', JSON.stringify(this.carts));

    console.log(JSON.parse(this.cookie.get('cart-foodapp')));
    // let s = Object.values(this.carts).reduce(
    //   (init: any, current: any) => init + current['soLuong'],
    //   0
    // );
    this.store.dispatch(update({ payload: value }));
    // console.log(JSON.parse(this.cookie.get('cart-foodapp')));
  }

  pay() {
    console.log(JSON.stringify(this.carts));
    this.authApi.post(endpointsAuth.pay, this.carts).subscribe((res) => {
      this.carts = null;
      this.cookie.delete('cart-foodapp');
      this.store.dispatch(update({ payload: 0 }));
      Swal.fire({
        icon: 'success',
        title: 'Congratulations',
        text: 'Chúc mừng bạn đã thanh toán thành công',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/']);
        }
      });
    });
    //   this.carts = null
    //   this.cookie.delete('cart')
    //   this.store.dispatch(update({payload: 0}))
    // })
  }

  changeQuantity(item: any, event: Event) {
    // if(item.idThucAn in this.carts)
    // {
    //   this.cookie.set('cart', JSON.stringify(this.carts));
    //   this.carts = { ...this.carts, [item.idThucAn]: { ...this.carts[item.idThucAn], "soLuong": parseInt() } };
    //     console.log(this.carts)
    //     return this.carts;
    // }
  }
}
