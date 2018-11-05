import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Product } from '../app.model';
import { config } from '../app.config';

@Injectable()
export class TaskService {
  _url = './assets/categories.json';
  productCol: AngularFirestoreCollection < Product > ;
  productDoc: AngularFirestoreDocument < Product > ;
  products: Observable < Product[] > ;
  product: Observable < Product > ;

  constructor(private http: HttpClient, private db: AngularFirestore) {}

  // Getting categories from categories.json file
  getCategories(): Observable < any > {
    return this.http.get(this._url);
  }

  // Get all products
  getProducts() {
    this.productCol = this.db.collection < Product > (config.collection_endpoint);
    this.products = this.productCol.snapshotChanges()
    .pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Product;
        data.id = a.payload.doc.id;
        return { ...data
        };
      }))
    );
    return this.products;
  }

  // Get single product
  getProduct(id: string) {
    this.productDoc = this.db.doc < Product > (`${config.collection_endpoint}/${id}`);
    this.product = this.productDoc.snapshotChanges()
      .pipe(map(action => {
        const data = action.payload.data() as Product;
        data.id = action.payload.id;
        return { ...data
        };
      }));
    return this.product;
  }

  // Add single product
  addProduct(product) {
    this.productCol.add(product);
    console.log('Adding process is completed.');
  }

  // Update single product
  updateProduct(id, product) {
    this.productDoc = this.db.doc < Product > (`${config.collection_endpoint}/${id}`);
    this.productDoc.update(product);
    console.log('Updating process is completed.');
  }

  // Delete single product
  deleteProduct(id) {
    this.productDoc = this.db.doc < Product > (`${config.collection_endpoint}/${id}`);
    this.productDoc.delete();
    console.log('Deleting process is completed.');
  }
}
