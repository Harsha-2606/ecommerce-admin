import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-product',
  imports: [CommonModule],
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.scss'
})
export class ViewProductComponent {
  product!: Product | undefined;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.loadProduct();
  }

  loadProduct() {
    const storedProducts = localStorage.getItem('products');
    const products: Product[] = storedProducts ? JSON.parse(storedProducts) : [];

    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.product = products.find(p => p.id === +productId);
    }
  }

  goBack() {
    this.router.navigate(['/add-product'])
  }
}
