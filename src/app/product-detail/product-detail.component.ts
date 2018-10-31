import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../app.model';
import { TaskService } from '../server/server-component';
import { config } from '../app.config';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.sass']
})

export class ProductDetailComponent implements OnInit {
  // categoryCol: AngularFirestoreCollection <Category> ;
  categories: any;

  // product = new Product('this.name', 123, 'this.description', 12132, false);
  product: Observable < any[] > ;

  products: Observable < any[] > ;
  myProduct: string;
  editMode = false;
  productToEdit: any = {};

  constructor(private db: AngularFirestore, private _taskService: TaskService, private _router: ActivatedRoute) {}

  ngOnInit() {
    // Getting categories from service method
    this._taskService.getCategories().subscribe(
      data => {
        this.categories = data;
      }
    );

    // Getting id from the url and setting
    this._router.paramMap.subscribe(parameterMap => {
      const key = parameterMap.get('id');
      console.log('1: ' + key);
      if (key != null && key !== '') {
        this.product = this._taskService.getProduct(key);
      }
    });
  }

  edit(product) {
    console.log(product);
    // Set taskToEdit and editMode
    this.productToEdit = product;
    this.editMode = true;
    // Set form value
    this.myProduct = product.description;
  }

  // save new data or edit current data on firebase db
  saveProduct() {
    console.log(this.myProduct);
    if (this.myProduct !== null) {
      // Get the input value
      const product = {
        description: this.myProduct
      };
      if (!this.editMode) {
        console.log(product);
        this._taskService.addProduct(product);
      } else {
        // Get the task id
        const productId = this.productToEdit.id;
        // update the task
        this._taskService.updateProduct(productId, product);
      }
      // set edit mode to false and clear form
      this.editMode = false;
      this.myProduct = '';
    }
  }
}
