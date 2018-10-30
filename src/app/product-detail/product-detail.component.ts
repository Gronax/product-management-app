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
  categoryCol: AngularFirestoreCollection <Category> ;
  categories: any;

  herbs = [];
  // product = new Product('this.name', 123, 'this.description', 12132, false);
  product = new Product('', 0, '', 0, false);

  name: string;
  price: number;
  description: string;
  category: number;
  availability: boolean;
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
  }

  addProduct() {
    console.log(this.product);
    this.afs.collection('products').add({
      'name': this.product.name,
      'price': this.product.price,
      'description': this.product.description,
      'category': this.product.category,
      'availability': this.product.availability
    });
  }
}
