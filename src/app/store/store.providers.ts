import { importProvidersFrom } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { productReducer } from "./product.reducer";
import { ProductEffects } from "./product.effects";

export const storeProviders = [
    importProvidersFrom(
        StoreModule.forRoot({ products: productReducer }),
        EffectsModule.forRoot([ProductEffects])
    )
];