import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { selectAllProducts, selectProductById } from '../store/product.selectors';
import { ProductState } from '../store/product.reducer';
import { loadProducts } from '../store/product.actions';

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.scss'
})
export class ViewProductComponent implements OnInit {
  product!: Product | undefined;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject<Store<{ products: ProductState }>>(Store);

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');

    if (productId) {
      this.store.pipe(select(selectProductById(+productId))).subscribe(product => {
        this.product = product;
      });

      this.store.pipe(select(selectAllProducts)).subscribe(products => {
        if(!products.length) {
          this.store.dispatch(loadProducts());
        }
      })
    }
  }

  goBack() {
    this.router.navigate(['/add-product'])
  }
}
