import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MyUserService } from "src/app/Service/my-user.service";
import { loginState } from "./auth.actions";
import { EMPTY, catchError, exhaustMap, map } from "rxjs";
import { CookieService } from "ngx-cookie-service";


@Injectable()

export class AuthEffect {

  constructor(private action$: Actions, private service: MyUserService, private cookie: CookieService) {

  }

  public user$ = this.cookie.get('user')

  _auth = createEffect(() =>
    this.action$.pipe(ofType(loginState.login), exhaustMap((action) => {
      return this.service.getUser().pipe(
        map((data) => {
          return loginState.login({user: data});
        }),
        catchError(() => EMPTY)
      )
    }))
  )

}
