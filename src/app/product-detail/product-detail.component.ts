import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../app.model';
import { TaskService } from '../services/task.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.sass']
})

export class ProductDetailComponent implements OnInit {
  @Output() formReady = new EventEmitter<FormGroup>();
  productForm: FormGroup;
  categories: any;
  editMode = false;
  editedProduct: Product;

  constructor(private _taskService: TaskService
    , private _route: ActivatedRoute
    , private _formBuilder: FormBuilder) {}

  ngOnInit() {
    // Getting categories from service method
    this._taskService.getCategories().subscribe(
      data => {
        this.categories = data;
      }
    );

    // Setting product form to default values
    this.productForm = this._formBuilder.group({
      name: [null, Validators.required],
      price : [null, Validators.required],
      description : [null, Validators.required],
      category : [-1, Validators.required],
      availability : [null, Validators.required]
    });

    // Getting id from the url and setting values
    this._route.paramMap.subscribe(parameterMap => {
      const key = parameterMap.get('id');
      if (key != null && key !== '') {
        this._taskService.getProduct(key).subscribe(data => {
          // Set values to inputs
          this.productForm.setValue({
            name: data.name,
            price: data.price,
            description: data.description,
            category: data.category,
            availability: data.availability
          });
          // Set editedProduct and editMode
          this.editedProduct = data;
          this.editMode = true;
        });
      }
    });
  }

  // Adding new product or updating selected one
  onSubmit(form: NgForm) {
    if (this.editMode) {
      this._taskService.updateProduct(this.editedProduct.id, form.value);
    } else {
      this._taskService.addProduct(form.value);
    }
  }
}
