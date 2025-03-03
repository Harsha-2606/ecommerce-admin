import { NgModule } from "@angular/core";
import { StoreModule, MetaReducer } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { localStorageSync } from 'ngrx-store-localstorage';
import { productReducer, ProductState } from "./product.reducer";
import { ProductEffects } from "./product.effects";

export function localStorageSyncReducer(reducer: any) {
    return (state: any, action: any) => {
        const newState = localStorageSync({
            keys: ['products'],
            rehydrate: true
        })(reducer)(state, action);
        return newState || state;
    };
}

const metaReducers: MetaReducer<any>[] = [localStorageSyncReducer];
@NgModule({
    imports: [
        StoreModule.forFeature('products', productReducer, { metaReducers }),
        EffectsModule.forFeature([ProductEffects])
    ],
    exports: [StoreModule, EffectsModule]
})
export class ProductStoreModule { }