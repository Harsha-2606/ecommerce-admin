import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState } from "./product.reducer";
import { Product } from "../models/product.model";

export const selectProductState = createFeatureSelector<ProductState>('products');

export const selectAllProducts = createSelector(
    selectProductState,
    (state: ProductState) => state.products
);

export const selectProductById = (productId: number) => createSelector(
    selectProductState, (state: ProductState) =>
    state.products.find((product: Product) => product.id === productId || null)
);