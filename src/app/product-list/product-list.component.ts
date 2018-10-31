import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { Product } from '../model/product';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass']
})

export class ProductListComponent implements OnInit {
  productCol: AngularFirestoreCollection <Product> ;
  products: any;

  name: string;
  price: number;
  description: string;
  category: number;
  availability: boolean;
  confirmation: boolean;

  productDoc: AngularFirestoreDocument <Product> ;
  product: Observable <Product> ;

  constructor(private afs: AngularFirestore, private confirmationDialogService: ConfirmationDialogService, private _router: Router) {

  }

  ngOnInit() {
    this.productCol = this.afs.collection('products');
    // this.categories = this.categoryCol.valueChanges();
    this.products = this.productCol.snapshotChanges()
      .pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Product;
          const id = a.payload.doc.id;
          return { id, data };
        });
      }));
  }

  openConfirmationDialog(productId) {
    this.confirmationDialogService.confirm('Please confirm.', 'Are you sure, you want to delete this product?')
    .then((confirmed) => {
    if (confirmed) {
        this.afs.doc('products/' + productId).delete();
      }
    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  editProduct(productId) {
    this._router.navigate(['product-detail', productId]);
  }
}
