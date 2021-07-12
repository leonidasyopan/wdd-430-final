import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";


import { ProductsComponent } from "./products/products.component";
import { ProductEditComponent } from "./products/product-edit/product-edit.component";
import { ProductDetailComponent } from "./products/product-detail/product-detail.component";

const appRoutes: Routes = [
  { path: '', component: ProductsComponent, children: [
    { path: 'new', component: ProductEditComponent },
    { path: ':id', component: ProductDetailComponent },
    { path: ':id/edit', component: ProductEditComponent },
  ]  }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
