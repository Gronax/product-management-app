import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {
    path: 'product-detail/:id',
    component: ProductDetailComponent
  },
  {
    path: 'product-list',
    component: ProductListComponent
  },
  {
    path: '',
    redirectTo: '/product-list',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
imports: [RouterModule.forRoot(routes, {
    enableTracing: true
  } // <-- debugging purposes only
)],
exports: [RouterModule]
})
export class AppRoutingModule {}
