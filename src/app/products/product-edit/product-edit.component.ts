import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'shopping-list-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  id: string;

  originalProduct: Product;
  product: Product;
  groupProducts: Product[] = [];
  isValidProduct = true;
  editMode: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = String(+params['id']);
          this.editMode = params['id'] != null || params['id'] != undefined;

          if(!this.id) return;

          this.originalProduct = this.productService.getProduct(params['id'])
          if(!this.originalProduct) return;

          this.product = JSON.parse(JSON.stringify(this.originalProduct));

          // if(this.product.group?.length > 0) {
          //   this.groupProducts = JSON.parse(JSON.stringify(this.product.group));
          // }
        }
      )
  }

  onCancel() {
    this.router.navigate(['/products']);
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newProduct = new Product(this.id, value.name, value.description, value.quantity, value.expectedPrice, value.actualPrice);
    if(this.editMode) {
      this.productService.updateProduct(this.originalProduct, newProduct);
    } else {
      this.productService.addProduct(newProduct);
    }
    this.router.navigate(['/products']);
  }

  isInvalidProduct(newProduct: Product) {
    if (!newProduct) return true;

    if (this.product && newProduct.id === this.product.id) {
      this.isValidProduct = false;
      return true;
    }

    for(const product of this.groupProducts) {
      if (newProduct.id === product.id) {
        this.isValidProduct = false;
        return true;
      }
    }

    this.isValidProduct = true;
    return false;
  }

  addToGroup($event: any) {
    const selectedProduct: Product = $event.dragData;
    const invalidGroupProduct = this.isInvalidProduct(selectedProduct);
    if (invalidGroupProduct){
      return;
    }
    this.groupProducts.push(selectedProduct);
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupProducts.length) {
      return;
    }
    this.groupProducts.splice(index, 1);
  }
}
