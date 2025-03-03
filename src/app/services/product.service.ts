import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Product } from "../models/product.model";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private products: Product[] = [];

    constructor() {}

    getProducts(): Observable<Product[]> {
        return of(this.products);
    }

    addProduct(product: Product): Observable<Product> {
        this.products.push(product);
        return of(product);
    }
}