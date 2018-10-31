import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, QueryFn } from 'angularfire2/firestore';
import { Product } from '../app.model';
import { config } from '../app.config';

@Injectable()
export class TaskService {
  _url = './assets/categories.json';
  productCol: AngularFirestoreCollection < Product > ;
  productDoc: AngularFirestoreDocument < Product > ;

  constructor(private http: HttpClient, private db: AngularFirestore) {}

  // Getting categories from categories.json file
  getCategories(): Observable < any > {
    return this.http.get(this._url);
  }

  // getCollection(ref?: QueryFn): Observable<Product[]> {
  //   return this.db.collection<Product>(config.collection_endpoint, ref)
  //     .snapshotChanges().pipe(map(actions => {
  //       return actions.map(a => {
  //         const data = a.payload.doc.data() as Product;
  //         const id = a.payload.doc.id;
  //         return { id, ...data };
  //       });
  //     }));
  // }

  getProduct(key?) {
    //  if (id != null && id !== '0') {
    //   return this.db.doc < Product > (`${config.collection_endpoint}/${id}`);
    //  } else {
    //   return this.db.doc < Product > (config.collection_endpoint);
    //   return this.db.collection(config.collection_endpoint).valueChanges();
    //  }
    console.log(key);
    if (key != null && key !== '0') {
      return this.db
        .collection(`${config.collection_endpoint}/${key}`)
        .snapshotChanges()
        .pipe(map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as Product;
            const id = a.payload.doc.id;
            return {
              id,
              data
            };
          });
        }));
    } else {
      return this.db
        .collection(config.collection_endpoint)
        .snapshotChanges()
        .pipe(map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as Product;
            const id = a.payload.doc.id;
            return {
              id,
              data
            };
          });
        }));
    }
  }

  addProduct(product) {
    this.productCol.add(product);
  }

  updateProduct(id, product) {
    this.productDoc = this.db.doc < Product > (`${config.collection_endpoint}/${id}`);
    this.productDoc.update(product);
  }

  deleteTask(id) {
    this.productDoc = this.db.doc < Product > (`${config.collection_endpoint}/${id}`);
    this.productDoc.delete();
  }
}
