import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from '../product-form/product-form.component';
import { MatDialog } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table'
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-product',
  imports: [CommonModule, ProductFormComponent, MatButtonModule, MatCardModule, MatTableModule, RouterModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit {
  products: Product[] = [];
  isTableView: boolean = true;
  showModal: boolean = false;
  editingProduct: Product | null = null;
  displayedColumns: string[] = ['name', 'description', 'type', 'price', 'stock', 'actions'];

  constructor(private router: Router, private dialog: MatDialog, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    const storedProducts = localStorage.getItem('products');
    this.products = storedProducts ? JSON.parse(storedProducts) : [];
  }

  saveProducts() {
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  openModal(product: Product | null = null) {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '400px',
      data: product,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (product) {
          this.products = this.products.map(p => (p.id === product.id ? result : p));
        } else {
          result.id = new Date().getTime();
          this.products = [...this.products, result];
        }
        this.saveProducts();
        this.cdRef.detectChanges();
      }
    });
  }

  editProduct(product: Product) {
    this.openModal(product);
  }

  deleteProduct(id: number) {
    this.products = this.products.filter(product => product.id !== id);
    this.saveProducts();
    this.cdRef.detectChanges();
  }

  handleProductSave(product: Product) {
    if (!product.id) {
      product.id = new Date().getTime();
      this.products.push(product);
    } else {
      this.products = this.products.map(p => (p.id === product.id ? product : p));
    }

    this.saveProducts();
  }

  viewProduct(productId: number) {
    this.router.navigate(['/view-product', productId])
  }

  toggleView() {
    this.isTableView = !this.isTableView;
    this.cdRef.detectChanges();
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }
}
