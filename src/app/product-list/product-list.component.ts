import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../app.model';
import { config } from '../app.config';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass']
})

export class ProductListComponent implements OnInit {
  products: Product[];
  // products: Observable < any[] > ;

  constructor(private db: AngularFirestore
    , private _taskService: TaskService
    , private confirmationDialogService: ConfirmationDialogService) {}

  ngOnInit() {
    // Listing all the products from firebase cloud db
    // Basic usage
    // this.products = this.db.collection(config.collection_endpoint).valueChanges();
    // To access id of the data

    this._taskService.getProducts().subscribe(products => {
      this.products = products;
    });
    // this.products = this._taskService.getProducts();
  }

  // Opens a conformation modal, if user clicks to yes the selected data will be removed from firebase cloud db
  openConfirmationDialog(product) {
    const productId = product.id;
    this.confirmationDialogService.confirm('Please confirm.', 'Are you sure, you want to delete this product?')
      .then((confirmed) => {
        // To check if user clicks to yes button
        if (confirmed) {
          this._taskService.deleteProduct(productId);
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
}
