import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/manage/categories/categories.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AboutComponent } from './components/about/about.component';
import { ChinhsachComponent } from './components/chinhsach/chinhsach.component';
import { CongthucComponent } from './components/congthuc/congthuc.component';
import { CongthucFormComponent } from './components/manage/congthuc-form/congthuc-form.component';
import { CongthucsComponent } from './components/manage/congthucs/congthucs.component';
import { DanhmucsComponent } from './components/manage/danhmucs/danhmucs.component';
import { DanhmucFormComponent } from './components/manage/danhmuc-form/danhmuc-form.component';
import { BaoloiComponent } from './components/baoloi/baoloi.component';
import { PoppupComponent } from './components/poppup/poppup.component';
import { PaymentComponent } from './components/payment/payment.component';
import { NutritionComponent } from './components/nutrition/nutrition.component';
import { ChitietcongthucComponent } from './components/chitietcongthuc/chitietcongthuc.component';
import { KhuyenmaiComponent } from './components/khuyenmai/khuyenmai.component';
import { ChitietkhuyenmaiComponent } from './components/chitietkhuyenmai/chitietkhuyenmai.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartComponent } from './components/cart/cart.component';
// import { authGaurd } from './core/auth-guard';
import { KhuyenmaisComponent } from './components/manage/khuyenmais/khuyenmais.component';
import { KhuyenmaisFormComponent } from './components/manage/khuyenmais-form/khuyenmais-form.component';

import { KhachhangComponent } from './components/manage/khachhang/khachhang.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { TdeeComponent } from './components/tdee/tdee.component';
import { TdeeResultComponent } from './components/tdee-result/tdee-result.component';
import { MealComponent } from './components/meal/meal.component';
import { DonhangsComponent } from './components/manage/donhangs/donhangs.component';
import { ProductFormComponent } from './components/manage/product-form/product-form.component';
import { ProductsComponent } from './components/manage/products/products.component';
import { ThucdonComponent } from './components/manage/thucdon/thucdon.component';
import { ThucdonFormComponent } from './components/manage/thucdon-form/thucdon-form.component';
import { ShippingComponent } from './components/manage/shipping/shipping.component';
import { ThanhtoanComponent } from './components/manage/thanhtoan/thanhtoan.component';
import { DashboardComponent } from './components/manage/dashboard/dashboard.component';
import { CongdongComponent } from './components/manage/congdong/congdong.component';
import { VerifycodeComponent } from './components/verifycode/verifycode.component';
import { SearchComponent } from './components/search/search.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // canActivate: [authGaurd],
  },
  {
    path: 'admin/categories/add',
    component: CategoriesComponent,
  },
  {
    path: 'admin/categories/:id',
    component: CategoriesComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'congthuc',
    component: CongthucComponent,
  },
  {
    path: 'policy',
    component: ChinhsachComponent,
  },
  {
    path: 'admin/congthucs',
    component: CongthucsComponent,
  },
  {
    path: 'admin/congthucs/add',
    component: CongthucFormComponent,
  },
  {
    path: 'admin/congthucs/:id',
    component: CongthucFormComponent,
  },
  {
    path: 'admin/danhmucs',
    component: DanhmucsComponent,
  },
  {
    path: 'admin/danhmucs/add',
    component: DanhmucFormComponent,
  },
  {
    path: 'admin/danhmucs/:id',
    component: DanhmucFormComponent,
  },
  {
    path: 'error',
    component: BaoloiComponent,
  },
  {
    path: 'popup',
    component: PoppupComponent,
  },
  {
    path: 'thanhtoan',
    component: PaymentComponent,
  },
  {
    path: 'dinhduong',
    component: NutritionComponent,
  },
  {
    path: 'dinhduong/:id',
    component: NutritionComponent,
  },
  { path: 'congthuc/:id', component: ChitietcongthucComponent },
  {
    path: 'khuyenmai',
    component: KhuyenmaiComponent,
  },
  { path: 'khuyenmai/:id', component: ChitietkhuyenmaiComponent },
  { path: 'products', component: ProductComponent },

  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },

  { path: 'admin/khuyenmais', component: KhuyenmaisComponent },
  { path: 'admin/khuyenmais/add', component: KhuyenmaisFormComponent },
  { path: 'admin/khuyenmais/:id', component: KhuyenmaisFormComponent },

  { path: 'admin/sanphams', component: ProductsComponent },
  { path: 'admin/sanphams/add', component: ProductFormComponent },
  { path: 'admin/sanphams/:id', component: ProductFormComponent },

  { path: 'admin/donhangs', component: DonhangsComponent },
  // { path: 'admin/khuyenmais/add', component: KhuyenmaisFormComponent },
  // { path: 'admin/khuyenmais/:id', component: KhuyenmaisFormComponent },

  { path: 'admin/khachhangs', component: KhachhangComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'verify', component: VerifycodeComponent },
  { path: 'tdee', component: TdeeComponent },
  { path: 'result', component: TdeeResultComponent },
  { path: 'meal-plan', component: MealComponent },
  { path: 'admin/thucdons', component: ThucdonComponent },
  { path: 'admin/thucdons/add', component: ThucdonFormComponent },
  { path: 'admin/thucdons/:id', component: ThucdonFormComponent },
  { path: 'admin/vanchuyens', component: ShippingComponent },
  { path: 'admin/thanhtoans', component: ThanhtoanComponent },
  { path: 'admin/dashboard', component: DashboardComponent },
  { path: 'admin/congdong', component: CongdongComponent },
  { path: 'search-result', component: SearchComponent },
];
