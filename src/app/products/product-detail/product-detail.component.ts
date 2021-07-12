import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Product } from '../product.model'
import { ProductService } from '../product.service';

@Component({
  selector: 'shopping-list-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  id: string;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = String(+params['id']);
          this.product = this.productService.getProduct(this.id);
        }
      )
  }

  onEditProduct() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDelete() {
    this.productService.deleteProduct(this.product);
    this.router.navigate(['/products']);
  }

}
