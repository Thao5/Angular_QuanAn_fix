import { NgModule, Component } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { SignupComponent } from './component/signup/signup.component';
import { CartComponent } from './component/cart/cart.component';
import { DatbanComponent } from './component/datban/datban.component';
import { FormDatBanComponent } from './component/form-dat-ban/form-dat-ban.component';
import { ChonBanComponent } from './component/chon-ban/chon-ban.component';
import { DatmonOfflineComponent } from './component/datmon-offline/datmon-offline.component';
import { CartOffComponent } from './component/cart-off/cart-off.component';
import { Page404Component } from './component/page404/page404.component';
import { IntroduceComponent } from './component/introduce/introduce.component';
import { MenuComponent } from './component/menu/menu.component';
import { ContactComponent } from './component/contact/contact.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { ThongTinCaNhanComponent } from './component/thong-tin-ca-nhan/thong-tin-ca-nhan.component';
import { DanhGiaComponent } from './component/danh-gia/danh-gia.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { FoodDetailComponent } from './food-detail/food-detail.component';
import { OwnerComponent } from './component/owner/owner.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: SignupComponent},
  {path: 'cart', component: CartComponent},
  {path: 'datban/:idChiNhanh', component: DatbanComponent},
  {path: 'datban/:idChiNhanh/ban/:idBan', component: FormDatBanComponent},
  {path: 'chonban', component: ChonBanComponent},
  {path: 'chonban/:idBan', component: DatmonOfflineComponent},
  {path: 'cartoff', component: CartOffComponent},
  {path: 'introduce', component: IntroduceComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'menu/:idFood', component: FoodDetailComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'forgot', component: ForgotPasswordComponent},
  {path: 'changepw', component: ChangePasswordComponent},
  {path: 'detail', component: ThongTinCaNhanComponent},
  {path: ':storeId/comments', component: DanhGiaComponent},
  {path: 'chatbot', component: ChatbotComponent},
  {path: 'owner', component: OwnerComponent},
  {path: '**', component: Page404Component},
];

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
  onSameUrlNavigation: 'reload'
  // ...any other options you'd like to use
};


@NgModule({
  imports: [RouterModule.forRoot(routes,  routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
