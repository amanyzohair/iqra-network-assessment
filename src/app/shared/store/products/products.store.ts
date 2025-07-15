import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { FilterPayload, Product } from './products.model';
import { inject } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  pipe,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { HttpResponse } from '@angular/common/http';

type ProductsState = {
  products: Product[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
  query: FilterPayload;
};
const initialState: ProductsState = {
  products: [],
  isLoading: false,
  filter: { query: '', order: 'asc' },
  query: { title: 'red' },
};
export const ProductsStore = signalStore(
  withState(initialState),
  withMethods((store, productsServ = inject(ProductsService)) => ({
    paginateProducts: rxMethod<FilterPayload>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((query: FilterPayload) => {
          return productsServ.getProducts(query).pipe(
            tap((response: Product[]) => {
              patchState(store, { isLoading: false, products: response });
            }),
            catchError((error) => {
              console.error('An error occurred:', error);
              return throwError(() => error);
            })
          );
        })
      )
    ),
  }))
);
