import { createAction, props } from '@ngrx/store';
import { Product } from '../models/product.model';

export const loadProducts = createAction('[Product] Load Products');
export const loadProductsSuccess = createAction('[Product] Load Products Success', props<{ products: Product[] }>())
export const addProduct = createAction('[Product] Add Product', props<{ product: Product }>())
export const editProduct = createAction('[Product] Edit Product', props<{ product: Product }>())
export const deleteProduct = createAction('[Product] Delete Product', props<{ id: number }>())