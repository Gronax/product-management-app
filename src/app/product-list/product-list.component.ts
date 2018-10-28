import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';

interface Category {
  code: number;
  title: string;
}

interface CategoryId extends Category {
  id: string;
}

interface Product {
  name: string;
  price: number;
  description: string;
  category: number;
  availability: boolean;
}

interface ProductId extends Product {
  id: string;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass']
})

export class ProductListComponent implements OnInit {
  productCol: AngularFirestoreCollection < Product > ;
  products: any;

  name: string;
  price: number;
  description: string;
  category: number;
  availability: boolean;

  productDoc: AngularFirestoreDocument <Product> ;
  product: Observable <Product> ;

  constructor(private afs: AngularFirestore) {

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

  addProduct() {
    this.afs.collection('products').add({
      'name': this.name,
      'price': this.price,
      'description': this.description,
      'category': this.category,
      'availability': this.availability
    });
  }

  getProduct(productId) {
    this.productDoc = this.afs.doc('products/' + productId);
    this.product = this.productDoc.valueChanges();
  }

  deleteProduct(productId) {
    this.afs.doc('products/' + productId).delete();
  }
}
