import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { homeProduct } from '../types/homeProduct';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  // products: any;
  // newProductUrl: string = '/assets/data/newProduct.json';
  // hotProductUrl: string = '/assets/data/hotProduct.json';
  // constructor() {}
  // http = inject(HttpClient);
  // getNewProducts(): Observable<homeProduct[]> {
  //   return this.http.get<homeProduct[]>(this.newProductUrl);
  // }
  // getHotProducts(): Observable<homeProduct[]> {
  //   return this.http.get<homeProduct[]>(this.hotProductUrl);
  // }
}
