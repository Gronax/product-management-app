import { Component, OnInit } from '@angular/core';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { Product } from '../app.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass']
})

export class ProductListComponent implements OnInit {
  products: Product[];

  constructor(private _taskService: TaskService
    , private confirmationDialogService: ConfirmationDialogService) {}

  ngOnInit() {
    // Getting all product list from service
    this._taskService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  // Opens a conformation modal, if user clicks to yes the selected data will be removed from firebase cloud db
  openConfirmationDialog(product) {
    const productId = product.id;
    this.confirmationDialogService.confirm('Please confirm.', 'Are you sure, you want to delete this product?')
      .then((confirmed) => {
        // To check if user clicks to yes button
        if (confirmed) {
          this._taskService.deleteProduct(productId);
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
}
