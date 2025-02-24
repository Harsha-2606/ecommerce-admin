import { createReducer, on } from "@ngrx/store";
import { Product } from "../models/product.model";
import { loadProductsSuccess, addProduct, editProduct, deleteProduct } from "./product.actions";

export interface ProductState {
    products: Product[];
}

export const initialState: ProductState = {
    products: []
};

export const productReducer = createReducer(
    initialState,
    on(loadProductsSuccess, (state, { products }) => {
        console.log('Products loaded:', products);
        return { ...state, products };
    }),
    on(addProduct, (state, { product }) => ({ ...state, products: [...state.products, product] })),
    on(editProduct, (state, { product }) => ({
        ...state,
        products: state.products.map(p => p.id === product.id ? product : p)
    })),
    on(deleteProduct, (state, { id }) => ({
        ...state,
        products: state.products.filter(product => product.id !== id)
    }))
);