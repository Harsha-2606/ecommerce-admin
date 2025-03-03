import { Component, Input, OnInit, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { ProductFormComponent } from '../product-form/product-form.component';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { loadProducts, deleteProduct } from '../store/product.actions';
import { selectAllProducts } from '../store/product.selectors';
import { ProductState } from '../store/product.reducer';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, MatCardModule, RouterModule, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  @Input() isTableView: boolean = false;
  @Input() displayedColumns: string[] = [];

  private store = inject<Store<{ products: ProductState }>>(Store);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  products$: Observable<Product[]> =  this.store.pipe(select(selectAllProducts));

  ngOnInit() {
    this.products$.subscribe(products => {
      console.log('Products Updated:', products);
    });
    this.store.dispatch(loadProducts());
  }

  editProduct(product: Product) {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '400px',
      data: product,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Editing Product:', result);
      }
    });
  }

  deleteProduct(id: number) {
    this.store.dispatch(deleteProduct({ id }));
  }

  viewProduct(productId: number) {
    this.router.navigate(['/view-product', productId]);
  }
}
