import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsStore } from '../shared/store/products/products.store';
import { FilterPayload } from '../shared/store/products/products.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [ProductsStore],
})
export class ProductsComponent implements OnInit {
  readonly store = inject(ProductsStore);
  form!: FormGroup;
  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl<string>(''),
      price: new FormControl<number>(0),
    });
    this.store.paginateProducts({});
  }
  filterProducts() {
    let payload: FilterPayload = {
      ...this.form.getRawValue(),
    };
    this.store.paginateProducts(payload);
  }
}
