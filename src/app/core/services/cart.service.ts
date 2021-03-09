import { Injectable } from '@angular/core';

import {BehaviorSubject} from 'rxjs'

import { Product} from '../models/product.model'

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private products: Product[] = []; // declaramos un array de productos, inicializando con array en vacio
  private cart = new BehaviorSubject<Product[]>([]);

  cart$= this.cart.asObservable(); // variable publica que pueda ser preguntada por cualquier componente y que sea de tipo observable para que cualquiera se suscriba a el para notar sus cambios en tiempo real

  constructor() { }

  addCart(product:Product) {
    this.products=[...this.products,product]; // cada vez voy a crear una referencia
    this.cart.next(this.products)// notificar a todos los componentes que estan suscritos que hubo un cambio, el array que se muestra aqui es la copia del array actual, esto se realizo en la linea de codigo anterior con los 3.
  }
}
