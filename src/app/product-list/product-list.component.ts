import { Component, Input } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { ProductFormComponent } from '../product-form/product-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [MatButtonModule, MatTableModule, MatCardModule, RouterModule, ProductFormComponent, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  @Input() products: Product[] = [];
  @Input() isTableView: boolean = false;
  @Input() displayedColumns: string[] = [];

  constructor(private router: Router, private dialog: MatDialog) {}

  editProduct(product: Product) {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '400px',
      data: product,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.products = this.products.map(p => (p.id === product.id ? result : p));
        this.saveProducts();
      }
    });
  }

  deleteProduct(id: number) {
    this.products = this.products.filter(product => product.id !== id);
    this.saveProducts();
  }

  viewProduct(productId: number) {
    this.router.navigate(['/view-product', productId]);
  }

  saveProducts() {
    localStorage.setItem('products', JSON.stringify(this.products));
  }
}
