import { Component, OnInit } from '@angular/core';

import { CartService} from './../../../core/services/cart.service'
import { map } from 'rxjs/operators' // normalmente se utiliza para transformar
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  total$ : Observable<number>; // creo variable observable

  constructor(
    private cartService: CartService
  ) {
    this.total$ = this.cartService.cart$ // le asigno un observable a la variable para luego convertirlo con un pipe al largo, para que despues al imprimir no sea observable utilizo variable | async 
    .pipe(
      map(products => products.length) // lista de productos y a qué la quiero transformar ( lo transformo al tamaño de la lista)
    );
   }

  ngOnInit() {
  }

}
