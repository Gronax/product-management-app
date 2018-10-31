import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { Category } from '../model/category';
import { HerbsService } from '../server/server-component';
import { Product } from '../model/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.sass']
})

export class ProductDetailComponent implements OnInit {
  // categoryCol: AngularFirestoreCollection <Category> ;
  categories: any;

  // product = new Product('this.name', 123, 'this.description', 12132, false);
  product: Product;

  constructor(private afs: AngularFirestore, private _herbService: HerbsService) {}

  ngOnInit() {
    // this.categoryCol = this.afs.collection('categories');
    // this.categories = this.categoryCol.valueChanges();
    // this.categories = this.categoryCol.snapshotChanges()
    //   .pipe(map(actions => {
    //     return actions.map(a => {
    //       const data = a.payload.doc.data() as Category;
    //       const id = a.payload.doc.id;
    //       return {
    //         id,
    //         data
    //       };
    //     });
    //   }));
    //   this._herbService.getJSON().subscribe(data => {
    //     this.categories = data;
    //     console.log(this.categories);
    // });
    this._herbService.getJSON().subscribe(
      data => {
        this.categories = data;
      }
    );
    this.product = {
      'name': '',
      'price': 0,
      'description': '',
      'category': -1,
      'availability': 'false'
    };
  }

  // save data to firebase db
  onSubmit() {
    console.log(this.product);
    this.afs.collection('products').add(this.product);
  }
}
