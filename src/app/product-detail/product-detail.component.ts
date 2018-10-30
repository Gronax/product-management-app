import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { Category } from '../model/model';
import { HerbsService } from '../server/server-component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.sass']
})

export class ProductDetailComponent implements OnInit {
  categoryCol: AngularFirestoreCollection <Category> ;
  categories: any;

  herbs = [];

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
    this._herbService.getJSON().subscribe(resHerbsData => this.categories = resHerbsData);
    console.log(this.categories);
  }

  addProduct() {
    console.log(this.category);
    this.afs.collection('products').add({
      'name': this.name,
      'price': this.price,
      'description': this.description,
      'category': this.category,
      'availability': this.availability
    });
  }
}
