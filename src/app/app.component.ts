import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadProducts } from './store/product.actions';
import { ProductState } from './store/product.reducer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ecommerce-admin';

  private store = inject<Store<ProductState>>(Store);

  ngOnInit() {
    setTimeout(() => {
      this.store.dispatch(loadProducts());
    }, 100);
  }
}
