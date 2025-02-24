import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { productReducer, ProductState } from "./product.reducer";
import { environment } from "../../environments/environment";
import { ActionReducerMap, MetaReducer } from "@ngrx/store";

export interface State {
    products: ProductState;
}

export const reducers: ActionReducerMap<State> = {
    products: productReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

@NgModule({
    imports: [
        StoreModule.forFeature('products', productReducer),
        StoreModule.forRoot(reducers, { metaReducers })
    ]
})
export class ProductStoreModule {}