import { createReducer, on } from "@ngrx/store";
import { Product } from "../models/product.model";
import { loadProductsSuccess, addProduct, editProduct, deleteProduct } from "./product.actions";

export interface ProductState {
    products: Product[];
}

const getSavedProducts = (): Product[] => {
    if (typeof window !== 'undefined' && window.localStorage) {
        const savedProducts = localStorage.getItem('products');
        return savedProducts ? JSON.parse(savedProducts) : [];
    }
    return [];
}

export const initialState: ProductState = {
    products: getSavedProducts()
};

export const productReducer = createReducer(
    initialState,
    on(loadProductsSuccess, (state, { products }) => {
        console.log('Products loaded:', products);
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('products', JSON.stringify(products));
        }
        return { ...state, products };
    }),
    on(addProduct, (state, { product }) => {
        const updatedProducts = [...state.products, product];
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('products', JSON.stringify(updatedProducts));
        }
        return { ...state, products: updatedProducts };
    }),
    on(editProduct, (state, { product }) => {
        const updatedProducts = state.products.map(p => p.id === product.id ? product : p);
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('products', JSON.stringify(updatedProducts));
        }
        return { ...state, products: updatedProducts };
    }),
    on(deleteProduct, (state, { id }) => {
        const updatedProducts = state.products.filter(product => product.id !== id);
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('products', JSON.stringify(updatedProducts));
        }
        return { ...state, products: updatedProducts };
    })
);