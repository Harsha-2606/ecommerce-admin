import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { Product } from '../models/product.model';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, CommonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  @Output() onSave = new EventEmitter<Product>();
  tempProduct: Product = { id: 0, name: '', description: '', type: '', price: 0, stock: 0 };

  constructor(
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product | null
  ) {
    if (data) {
      this.tempProduct = { ...data }
    }
  }

  saveProduct() {
    if (!this.tempProduct.id) {
      this.tempProduct.id = new Date().getTime();
    }
    this.onSave.emit(this.tempProduct);
    this.dialogRef.close(this.tempProduct);
  }

  cancel() {
    this.dialogRef.close();
  }
}
