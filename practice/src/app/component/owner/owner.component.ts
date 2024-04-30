import { Component, EventEmitter, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService, endpoints } from 'src/app/Config/api.service';
import { AuthApiService, endpointsAuth } from 'src/app/Config/auth-api.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css'],
})
export class OwnerComponent implements OnInit {
  [x: string]: any;
  apis = inject(ApiService);
  cookie = inject(CookieService);
  fb = inject(FormBuilder);
  router = inject(Router);
  authAPIs = inject(AuthApiService)

  //Edition
  canEdit!: boolean;
  foodSelected !: any;
  fieldSelected: any;
  editSoLuong !: boolean;
  editPrice !: boolean;
  editActive !: boolean;
  editImage !: boolean;
  keyName !: any;
  food_edit !: any;
  q !: any;
  // Object = Object;
  //...

  cate!: any;
  loading!: any;
  user!: any;
  foods!: any;
  huser!: any;
  p: number = 1;
  itemPerPage: number = 4;
  totalProduct!: any;

  //Form AddFood
  addFood: FormGroup;
  image: File | null | undefined = null;
  //...
  avatar: File | null | undefined = null;
  isModalShow!: boolean;

  constructor() {
    this.addFood = this.fb.group({
      name: [, Validators.required],
      soLuong: [, Validators.required],
      price: [, Validators.required],
      idLoai: [, Validators.required],
      idChiNhanh: [4, Validators.required],
    });
  }

  //variable Form AddFoodEvent
  get name() {
    return this.addFood.get('name');
  }

  get soLuong() {
    return this.addFood.get('soLuong');
  }

  get price() {
    return this.addFood.get('price');
  }

  get idLoai() {
    return this.addFood.get('idLoai');
  }

  get idChiNhanh() {
    return this.addFood.get('idChiNhanh');
  }
  //...

  async ngOnInit(): Promise<void> {
    // this.canEdit = false;
    this.editSoLuong = false;
    this.editPrice = false;
    this.editImage = false;
    this.editActive = false;
    // this.foodSelected = null;
    //show Food
    this.loading = true;
    // this.apis.get(endpoints.foods).subscribe((data) => {
    //   this.foods = data
    //   this.loading = false
    //   // this.totalProduct = data.length;
    // })
    let data = await this.authAPIs.getFood(endpointsAuth.allFood);
    this.foods = data;
    if (this.foods !== null) this.loading = false;
    if (this.foods === null) this.loading = true;
    if (this.cookie.check('user') === true) {
      this.user = JSON.parse(this.cookie.get('user'));
    }
    this.huser = this.cookie.check('user');
    console.log(this.user);
    //...

    //Take Category From API
    let dataCate = await this.apis.getCate(endpoints.cate);
    this.cate = dataCate;
    if (this.cate !== null) this.loading = false;
    if (this.cate === null) this.loading = true;
    //...
  }

  addFoodEvent(event: Event) {
    event.preventDefault();
    if (this.addFood.invalid) {
      return;
    }

    this.loading = true;

    const formData = new FormData();
    for (const field in this.addFood.value) {
      formData.append(field, this.addFood.value[field]);
    }

    if (this.image) {
      formData.append('avatar', this.image);
    }

    this.apis.post(endpoints.add_food, formData).subscribe((response) => {
      Swal.fire({
        icon: 'success',
        title: 'Congratulations',
        text: 'Chúc mừng bạn đã thêm thành công',
      }).then((result) => {
        if (result.isConfirmed) {
          this.isModalShow = true;
          this.loading = false;
          this.ngOnInit();
        }
      });
    });
  }

  //onFileChange of Form AddFood
  onFileChange(event: Event) {
    this.image = (event.target as HTMLInputElement).files?.[0];
  }
  //...

  //Edition
  EditButtonSoLuong(food: any) {
    this.foodSelected = food
     this.editSoLuong = true;
  }

  EditButtonPrice(food: any) {
    this.foodSelected = food
     this.editPrice = true;
  }

  EditButtonImage(food: any) {
    this.foodSelected = food
     this.editImage = true;
  }

  EditButtonActive(food: any) {
    this.foodSelected = food
     this.editActive = true;
  }

  onSuccesChangeSoLuong(food: any,quantity: any){
    this.avatar = food.image as File

    const file= new File([],'');
    this.q = parseInt(quantity);
    this.food_edit = {
      'soLuong': this.q
    }
    const formData = new FormData()
    console.log(this.food_edit)
    formData.append('soLuong', this.q)
    // formData.append('avatar', food.image as File)
    // console.log(formData.get('avatar'))
    // console.log(formData.get('soLuong'))
    this.authAPIs.patch(endpointsAuth.patchFood(food.id), formData
    ).subscribe(data => {console.log(data)
      this.ngOnInit();
    })

  }

  onSuccesChangePrice(food: any,price: any){
    this.avatar = food.image as File

    // const file= new File([],'');
    this.q = parseInt(price);
    const formData = new FormData()
    formData.append('price', this.q)
    // formData.append('avatar', food.image as File)
    // console.log(formData.get('avatar'))
    // console.log(formData.get('soLuong'))
    this.authAPIs.patch(endpointsAuth.patchFood(food.id), formData
    ).subscribe(data => {console.log(data)
      this.ngOnInit();
    })

  }

  onSuccessChangeActive(food:any, active: any) {
    const formData = new FormData()
    formData.append('active', active.value)
    this.authAPIs.patch(endpointsAuth.patchFood(food.id), formData
    ).subscribe(data => {console.log(data)
      this.ngOnInit();
    })
  }

  onSuccessChangeImage(food:any) {

    
  }

  cancelEdit() {
    this.foodSelected = null
    // this.canEdit = false;
    this.editSoLuong = false;
    this.editPrice = false;
    this.editImage = false;
    this.editActive = false;
  }
  //...

  onFileChangeEdit(food:any ,event: Event) {
    this.avatar = (event.target as HTMLInputElement).files?.[0];
    // console.log(this.avatar)
    const formData = new FormData()
    if(this.avatar) formData.append('avatar', this.avatar)
    this.authAPIs.patch(endpointsAuth.patchFoodImage(food.id), formData
    ).subscribe(data =>
      this.ngOnInit()
    )
  }

  //delete Food
  deleteFood(food:any) {
    this.authAPIs.delete(endpointsAuth.deleteFood(food.id)).subscribe(() => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          this.ngOnInit();
        }
      });
    })
  }
  //...
}
