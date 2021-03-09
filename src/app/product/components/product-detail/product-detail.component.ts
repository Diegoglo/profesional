import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ProductsService } from './../../../core/services/products/products.service';
import { Product } from '../../../core/models/product.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { switchMap} from 'rxjs/operators'
import {Observable} from 'rxjs'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product$: Observable<Product>;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    this.product$ = this.route.params
    .pipe(
      switchMap((params: Params) =>  { // parametros que estamos recibiendo
      return this.productsService.getProduct(params.id); // con el switch map cambiamos un observable por otro, es decir reemplazamos por el observable dle id
    })
    );
  }

  createProduct(){
    const newProduct : Product={
      id : '6',
      title: '¿Realmente te extraño?',
      image: 'assets/images/camiseta.png',
      price: 3000,
      description: 'hello!, a product by Diego Monsalve at platzi'
    };

    this.productsService.createProduct(newProduct)
    .subscribe(product => {
      console.log(product);
    });
  }
  
  updateProduct(){
    const updateProduct: Partial<Product> = {
      title: 'En la playa',
      description: 'En la playaaa, somos tu y yoo'
    };
    this.productsService.updateProduct('1',updateProduct) // id del que quiero modificar y lo que quiero modificar 
    .subscribe(product => {
      console.log(product);
    })
  }

  deleteProduct(){
    this.productsService.deleteProduct('4')
    .subscribe(product => {
      console.log(product);
    })
  }

  getRandomUsers(){
    this.productsService.getRandomUsers()
    .subscribe(
      users => { // esos users que estan ahi son de tipo users, y si llego hasta este punto significa que pudo obtener con exito
      console.log(users);
    },
      error => {
        console.error(error)
      }
    );
  }

}