import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'customers'
  },
  {
    path: 'customers',
    loadChildren: () =>
      import('./customers/customers.module').then(m => m.CustomersModule)
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.module').then(m => m.ProductsModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
