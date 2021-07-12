import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Product } from './product.model';

interface Response {
  message: string,
  products: Product []
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseURL: string = 'http://localhost:3000/';

  productListChangedEvent = new Subject<Product[]>();

  products: Product [] =[];

  productSelectedEvent = new EventEmitter<Product>();

  constructor(private http: HttpClient) {
    http.get<Response>(this.baseURL + 'products')
    .subscribe(response => {
      this.setProducts(response.products);

      localStorage.setItem('products', JSON.stringify(response.products));

      this.products.sort((a, b) => a.name > b.name ? 1 : 0);

      const productsListClone: Product[] = this.products.slice();

      this.productListChangedEvent.next(productsListClone);
    }, (error: any) => {
      console.error(error);
    })
  }

  setProducts(products: Product []) {
    this.products = products;
  }

  getProducts(): Product[] {
    return this.products.slice();
  }

  getProduct(id: string): Product {
    if(this.products.length < 1) {
      this.products = JSON.parse(localStorage.getItem('products'))
    }

    let result: Product;

    this.products.forEach(product => {
      if(product.id === id) {
        result = product;
      }
    })

    return result ? result : null;
  }

  deleteProduct(product: Product) {

    if (!product) return;

    const position = this.products.findIndex(cont => cont.id === product.id);

    if (position < 0) return;

    this.http.delete('http://localhost:3000/products/' + product.id)
      .subscribe(
        (response: Response) => {
          this.products.splice(position, 1);

          this.refreshProductsListing();
        }
      );
  }

  addProduct(product: Product) {
    if (!product) return;

    product.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.post<{ message: string, product: Product }>('http://localhost:3000/products',
      product,
      { headers: headers })
      .subscribe(
        (responseData) => {
          this.products.push(responseData.product);

          this.refreshProductsListing();
        }
      );
  }

  updateProduct(originalProduct: Product, newProduct: Product) {
    if (!originalProduct || !newProduct) return;

    const position = this.products.findIndex(product => product.id === originalProduct.id);

    if (position < 0) return;

    newProduct.id = originalProduct.id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.put('http://localhost:3000/products/' + originalProduct.id,
      newProduct, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.products[position] = newProduct;

          this.refreshProductsListing();
        }
      );
  }

  refreshProductsListing() {
    const productsListClone: Product[] = this.products.slice();

    this.productListChangedEvent.next(productsListClone);
  }
}
