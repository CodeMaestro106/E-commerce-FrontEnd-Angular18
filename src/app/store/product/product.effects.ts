import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  concatMap,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import {
  getProductListAction,
  getProductListSuccess,
  actionProductFailure,
  createProductAction,
  createProductSuccess,
  deleteProductAction,
  deleteProductSuccess,
  updateProductAction,
  updateProductSuccess,
} from './product.actions';
import { ProductService } from './product.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ProductEffects {
  getProductListAction$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(getProductListAction),
      switchMap(() =>
        this.productService.getProductList().pipe(
          map((response) => {
            console.log('get list products', response);
            const processData = response.map((item) => {
              return this.productService.transformToProduct(item);
            });
            this.toastService.success(
              'Loading products info is successful',
              'Success',
            );
            return getProductListSuccess({ products: processData });
          }),
          catchError((error) => {
            const errorMessage =
              error?.error?.msg ||
              'Loading Product info had failed. Please try again.';
            this.toastService.error(errorMessage, 'Error');

            return of(actionProductFailure({ error: errorMessage }));
          }),
        ),
      ),
    ),
  );

  createProductEffect$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(createProductAction),
      tap(() => {
        console.log('Product list effect');
      }),
      switchMap((action) =>
        this.productService.createProduct(action.product).pipe(
          map((response) => {
            console.log('create product respones =>', response);
            const processData =
              this.productService.transformToProduct(response);
            return createProductSuccess({ product: processData });
          }),
          catchError((error) => {
            console.log('create product respones error =>', error);

            const errorMessage =
              error?.error?.msg ||
              'Adding Product info had failed. Please try again.';
            this.toastService.error(errorMessage, 'Error');
            return of(actionProductFailure({ error: errorMessage }));
          }),
        ),
      ),
    ),
  );

  updateProductEffect$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(updateProductAction),
      tap(() => {
        console.log('Update Product effect');
      }),
      switchMap((action) => {
        console.log('update product =>', action.product);
        return this.productService
          .updateProduct(action.id, action.product)
          .pipe(
            map((response) => {
              console.log('update product respones success =>', response);
              const processData =
                this.productService.transformToProduct(response);
              return updateProductSuccess({ product: processData });
            }),
            catchError((error) => {
              const errorMessage =
                error?.error?.msg ||
                'Adding Product info had failed. Please try again.';
              this.toastService.error(errorMessage, 'Error');

              return of(actionProductFailure({ error: errorMessage }));
            }),
          );
      }),
    ),
  );

  deleteProductItem$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(deleteProductAction),
      tap(() => {
        console.log('Product list effect');
      }),
      switchMap((action) =>
        this.productService.deleteProduct(action.id).pipe(
          map((response) => {
            return deleteProductSuccess({ id: action.id });
          }),
          catchError((error) => {
            const errorMessage =
              error?.error?.msg ||
              'Deleting Product info had failed. Please try again.';
            this.toastService.error(errorMessage, 'Error');

            return of(actionProductFailure({ error: errorMessage }));
          }),
        ),
      ),
    ),
  );

  navigateToProductList$ = createEffect(
    () =>
      inject(Actions).pipe(
        ofType(createProductSuccess, updateProductSuccess),
        tap(() => {
          this.router.navigate(['admin/products']);
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private productService: ProductService,
    private router: Router,
    private toastService: ToastrService,
  ) {}
}
