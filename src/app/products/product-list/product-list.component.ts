import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

import { Product } from '../product.model'
import { ProductService } from '../product.service';

@Component({
  selector: 'shopping-list-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  products: Product[] = [];

  searchedTerm: string;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts();

    this.subscription = this.productService.productListChangedEvent
      .subscribe(
        (productsList: Product[]) => {
          this.products = productsList;
        }
      )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onNewProduct() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  search(term: string) {
    this.searchedTerm = term;
  }

}
