import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core'
import { CookieService } from 'ngx-cookie-service';
import { authUserSelector } from './Reducer/MyUserState/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  user!:any
 constructor(private cookie: CookieService, private store: Store<{authUser: {user: any}}>) {
  if(this.cookie.check('user') === true)
    {
      this.user = JSON.parse(this.cookie.get('user'))
      // this.store.select('authUser').subscribe( (data) =>
      //   this.user = data
      //   )
    }
  // if(this.cookie.check('cart') === true)
  // {
  //   this.cart = JSON.parse(this.cookie.get('cart'))
  // }
 }

  ngOnInit() {
  }

}
