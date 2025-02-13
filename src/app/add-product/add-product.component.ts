import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-add-product',
  imports: [],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit {
  products: Product[] = [];
  isTableView: boolean = true;
  showModal: boolean = false;
  editingProduct: Product | null =null;

  constructor(private router: Router) {}

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

  openModal() {
    this.editingProduct = null;
    this.showModal = true;
  }

  editProduct(product: Product) {
    this.editingProduct = { ...product };
    this.showModal = true;
  }

  deleteProduct(id: number) {
    this.products = this.products.filter(product => product.id !== id);
    this.saveProducts();
  }

  handleProductSave(product: Product) {
    if (this.editingProduct) {
      this.products = this.products.map(p => (p.id === product.id ? product : p));
    } else {
      product.id = new Date().getTime();
      this.products.push(product);
    }
    this.saveProducts();
    this.showModal = false;
  }

  toggleView() {
    this.isTableView = !this.isTableView;
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }
}
