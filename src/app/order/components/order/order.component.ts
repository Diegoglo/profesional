import { Component, OnInit } from '@angular/core';
import { ProductsListComponent } from 'src/app/admin/components/products-list/products-list.component';

import { map } from 'rxjs/operators' // normalmente se utiliza para transformar
import { Observable } from 'rxjs'
import { Product} from '../../../core/models/product.model'
import { CartService} from './../../../core/services/cart.service'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  products$ : Observable<Product[]>;

  constructor(
    private cartService : CartService
  ) { 
    this.products$ = this.cartService.cart$.pipe(
      map((products:[]) => {
      const distintos = [...new Set(products)];
      return distintos;
    }));
  }

  ngOnInit() {
  }

}
