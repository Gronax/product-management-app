import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { FormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from './confirmation-dialog/confirmation-dialog.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from './server/server-component';

// My firebase credentials
const firebaseConfig = {
  apiKey: 'AIzaSyB0uA78TrBJw37iH8dnXMWziYyK7zCpzDg',
  authDomain: 'product-management-c31f2.firebaseapp.com',
  databaseURL: 'https://product-management-c31f2.firebaseio.com',
  projectId: 'product-management-c31f2',
  storageBucket: 'product-management-c31f2.appspot.com',
  messagingSenderId: '656559457760'
};

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ProductListComponent,
    ProductDetailComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [
    ConfirmationDialogService,
    TaskService
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
