import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectProductById } from '../store/product.selectors';
import { ProductStoreModule } from '../store/product-store.module';

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [CommonModule, ProductStoreModule],
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.scss'
})
export class ViewProductComponent {
  product!: Product | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store) {}

  ngOnInit() {
    this.loadProduct();
  }

  loadProduct() {
    const productId = this.route.snapshot.paramMap.get('id');
    console.log('Product ID:', productId)
    if (productId) {
      this.store.select(selectProductById(+productId)).subscribe(product => {
        this.product = product;
        console.log('Product:', product)
      });
    }
  }

  goBack() {
    this.router.navigate(['/add-product'])
  }
}
