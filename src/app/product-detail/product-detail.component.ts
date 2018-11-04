import { Component, OnInit } from '@angular/core';
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../app.model';
import { TaskService } from '../services/task.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.sass']
})

export class ProductDetailComponent implements OnInit {
  // product: Product = {
  //   name: '',
  //   price: 0,
  //   description: '',
  //   category: -1,
  //   availability: false
  // };
  categories: any;
  product: Product;
  myProduct: string;
  editMode = false;
  editedProduct: Product;
  // productForm: FormGroup;

  constructor(private _taskService: TaskService
    , private _router: Router
    , private _route: ActivatedRoute) {}

  ngOnInit() {
    // console.log(this._route.snapshot.params['id']);
    // this.getProduct(this._route.snapshot.params['id']);
    // this.productForm = this._formBuilder.group({
    //   'name' : [null, Validators.required],
    //   'price' : [null, Validators.required],
    //   'description' : [null, Validators.required],
    //   'category' : [null, Validators.required],
    //   'availability' : [null, Validators.required]
    // });

    // Getting categories from service method
    this._taskService.getCategories().subscribe(
      data => {
        this.categories = data;
      }
    );

    // const key = this._route.snapshot.params['id'];
    // if (key != null && key !== '') {
    //   this._taskService.getProduct(key).subscribe(data => {
    //     console.log(data);
    //     this.product = data;
    //   });
    // }
    // console.log(this.product);
    // Getting id from the url and setting
    this._route.paramMap.subscribe(parameterMap => {
      const key = parameterMap.get('id');
      if (key != null && key !== '') {
        this._taskService.getProduct(key).subscribe(data => {
          console.log('data');
          console.log(data);
          this.product = data;
        });
        console.log('this.products');
        console.log(this.product);
      } else {
        this.product = null;
      }
      console.log(this.product);
    });
  }

  // getProduct(id) {
  //   this._taskService.getProduct(id).subscribe(data => {
  //     this.product.id = data.key;
  //     this.productForm.setValue({
  //       title: data.title,
  //       description: data.description,
  //       author: data.author
  //     });
  //   });
  // }

  edit(product: Product) {
    console.log(product);
    // Set taskToEdit and editMode
    this.editedProduct = product;
    this.editMode = true;
    // Set form value
    this.myProduct = product.description;
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    if (!this.editMode) {
      this._taskService.addProduct(this.product);
    } else {
      this._taskService.updateProduct(this.editedProduct);
    }
  }
  // save new data or edit current data on firebase db
  // saveProduct() {
  //   console.log(this.myProduct);
  //   if (this.myProduct !== null) {
  //     // Get the input value
  //     const product = {
  //       description: this.myProduct
  //     };
  //     if (!this.editMode) {
  //       console.log(product);
  //       this._taskService.addProduct(product);
  //     } else {
  //       // Get the task id
  //       const productId = this.productToEdit.id;
  //       // update the task
  //       this._taskService.updateProduct(productId, product);
  //     }
  //     // set edit mode to false and clear form
  //     this.editMode = false;
  //     this.myProduct = '';
  //   }
  // }
}
