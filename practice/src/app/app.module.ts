import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { SignupComponent } from './component/signup/signup.component';
import { MyUserService } from './Service/my-user.service';
import { MySpinnerComponent } from './layout/my-spinner/my-spinner.component';
import { StoreModule } from '@ngrx/store';
import { CounterReducer } from './Reducer/MyCartCounterState/counter.reducer';
import { MyScrollDirective } from './test/my-scroll.directive';
import { CartComponent } from './component/cart/cart.component';
import { MyCartService } from './Service/my-cart.service';
import { UserReducer } from './Reducer/MyUserState/state.reducer';
import { DatbanComponent } from './component/datban/datban.component';
import { FormDatBanComponent } from './component/form-dat-ban/form-dat-ban.component';
import { DatmonOfflineComponent } from './component/datmon-offline/datmon-offline.component';
import { ChonBanComponent } from './component/chon-ban/chon-ban.component';
import { CartOffComponent } from './component/cart-off/cart-off.component';
import { Page404Component } from './component/page404/page404.component';
import { IntroduceComponent } from './component/introduce/introduce.component';
import { MenuComponent } from './component/menu/menu.component';
import { ContactComponent } from './component/contact/contact.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { ThongTinCaNhanComponent } from './component/thong-tin-ca-nhan/thong-tin-ca-nhan.component';
import { DanhGiaComponent } from './component/danh-gia/danh-gia.component';
import { DatePipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { authReducer } from './Reducer/MyUserState/auth.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthEffect } from './Reducer/MyUserState/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import { metaReducers, reducers } from './Reducer/Global';
import { ChatbotComponent } from './chatbot/chatbot.component';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleSigninButtonModule,
  FacebookLoginProvider,
} from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { FoodDetailComponent } from './food-detail/food-detail.component';
import { OwnerComponent } from './component/owner/owner.component';
import { TabsModule } from "ngx-bootstrap/tabs"
// import { metaReducers, reducers } from './Reducer/Global';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    MySpinnerComponent,
    MyScrollDirective,
    CartComponent,
    DatbanComponent,
    FormDatBanComponent,
    DatmonOfflineComponent,
    ChonBanComponent,
    CartOffComponent,
    Page404Component,
    IntroduceComponent,
    MenuComponent,
    ContactComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    ThongTinCaNhanComponent,
    DanhGiaComponent,
    ChatbotComponent,
    FoodDetailComponent,
    OwnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    // StoreModule.forRoot({counter: CounterReducer, auth: authReducer}),
    StoreModule.forRoot(reducers, { metaReducers }),
    NgxPaginationModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([AuthEffect]),
    SocialLoginModule,
    GoogleSigninButtonModule,
    TabsModule.forRoot()
  ],
  providers: [
    CookieService,
    MyCartService,
    DatePipe,
    MyUserService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '708090744448-i1iao1kj4sqj27ktlbt5f9k9aqh3sa3l.apps.googleusercontent.com',
              {
                oneTapEnabled: false,
                prompt: 'consent',
              }
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1464142041188880'),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
