import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { Category } from '../model/category';
import { ProductService } from '../server/server-component';
import { Product } from '../model/product';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private db: AngularFirestore, private _productService: ProductService, private _router: ActivatedRoute) {}

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
    
    // Getting categories from service method
    this._productService.getCategories().subscribe(
      data => {
        this.categories = data;
      }
    );
    // Getting id from the url
    this._router.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');
      console.log('1: ' + id);
      this.getProduct(id);
    });
  }

  getProduct(id) {
    console.log('2: ' + id);
    if (id === 0) {
      this.product = {
        'name': '',
        'price': 0,
        'description': '',
        'category': -1,
        'availability': 'false'
      };
    }
    else{
      console.log('3: ' + id);
      console.log(this._productService.getProduct(id));
      // this.product = this._productService.getProduct(id);
    }
  }

  // save data to firebase db
  onSubmit() {
    console.log('4: ' + this.product);
    this.db.collection('products').add(this.product);
  }
}
