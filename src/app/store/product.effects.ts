import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { ProductState } from "./product.reducer";
import { loadProducts, loadProductsSuccess } from "./product.actions";
import { switchMap, map, tap, of } from "rxjs";
import { ProductService } from "../services/product.service";

@Injectable()
export class ProductEffects {

    private actions$ = inject(Actions);
    private store = inject<Store<ProductState>>(Store);
    private productService = inject(ProductService);

    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadProducts),
            tap(() => console.log('Loading products...')),
            switchMap(() =>
                this.productService.getProducts().pipe(
                    map(products => loadProductsSuccess({ products }))
                )
            )
        )
    );

    initLoadProducts$ = createEffect(() =>
        of(null).pipe(
            tap(() => console.log('Initializing store from localstorage...')),
            map(() => {
                const savedProducts = localStorage.getItem('products');
                return loadProductsSuccess({ products: savedProducts ? JSON.parse(savedProducts) : [] });
            })
        )
    );
}