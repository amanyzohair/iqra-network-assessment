import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  FilterPayload,
  Product,
} from '../../shared/store/products/products.model';
import { appendParamsFromObject } from '../../shared/utils/utils';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}
  getProducts(payload?: FilterPayload): Observable<Product[]> {
    let params: HttpParams = new HttpParams();
    payload ? (params = appendParamsFromObject(payload)) : null;

    return this.httpClient.get<Product[]>(
      'https://api.escuelajs.co/api/v1/products',
      { params }
    );
  }
}
