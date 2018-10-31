import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Product } from '../model/product';

@Injectable()
export class ProductService {
  private _url = './assets/categories.json';
  constructor (private http: HttpClient, private db: AngularFirestore) { }
  productCol: AngularFirestoreCollection <Product> ;
  products:  Observable<any>;
  
  // Getting categories from categories.json file
  public getCategories(): Observable <any> {
    return this.http.get(this._url);
  }

  public getProduct(id) {
    // this.categories = this.categoryCol.valueChanges();
    // this.productCol = this.db.collection('products');
    // this.products = this.productCol.doc(id).snapshotChanges()
    // .pipe(map(res => {
    //     const data = res.payload.data() as Product;
    //     return { data };
    // }));
    console.log('5: ' + id);
    console.log(this.db.collection('products').doc(id).valueChanges());
    // this.products = this.db.collection('products').doc(id).valueChanges();
    // console.log(this.products);
    // return this.products;
  }
}
