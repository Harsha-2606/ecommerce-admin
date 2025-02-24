import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from '../product-form/product-form.component';
import { MatDialog } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table'
import { MatCardModule } from '@angular/material/card';
import { ProductListComponent } from '../product-list/product-list.component';
import { Store } from '@ngrx/store';
import { loadProducts, loadProductsSuccess, addProduct, editProduct, deleteProduct } from '../store/product.actions';
import { selectAllProducts } from '../store/product.selectors';
import { ProductStoreModule } from '../store/product-store.module';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ProductFormComponent, MatButtonModule, MatCardModule, MatTableModule, RouterModule, ProductListComponent, ProductStoreModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit {
  products: Product[] = [];
  isTableView: boolean = true;
  showModal: boolean = false;
  editingProduct: Product | null = null;
  displayedColumns: string[] = ['name', 'description', 'type', 'price', 'stock', 'actions'];

  constructor(private router: Router, private dialog: MatDialog, private cdRef: ChangeDetectorRef, private store: Store) { }

  ngOnInit(): void {
    this.loadProducts();
    this.store.select(selectAllProducts).subscribe(products => {
      this.products = products;
      this.cdRef.detectChanges();
    });
  }

  loadProducts() {
    const storedProducts = localStorage.getItem('products');
    const products = storedProducts ? JSON.parse(storedProducts) : [];
    this.store.dispatch(loadProductsSuccess({ products }));
  }

  openModal(product: Product | null = null) {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '400px',
      data: product,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (product) {
          this.store.dispatch(editProduct({ product: result }));
        } else {
          result.id = new Date().getTime();
          this.store.dispatch(addProduct({ product: result}))
        }
      }
    });
  }

  editProduct(product: Product) {
    this.openModal(product);
  }

  deleteProduct(id: number) {
    this.store.dispatch(deleteProduct({ id }));
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
