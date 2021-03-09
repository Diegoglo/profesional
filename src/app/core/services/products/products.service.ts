import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Product } from '../../models/product.model';
import { Observable, throwError} from 'rxjs'
import { map, catchError, retry} from 'rxjs/operators'
import * as Sentry from "@sentry/browser";


import { environment } from './../../../../environments/environment';
import { captureException } from '@sentry/browser';

interface User{ // creo un modelo
  email :string;
  gender: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts() {
    return this.http.get<Product[]>(`${environment.url_api}/products`);
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${environment.url_api}/products/${id}`);
  }

  createProduct(product: Product) { // necesitamos un objeto product junto a sus especificaciones
    return this.http.post(`${environment.url_api}/products`, product); // el cuerpo va a ser nuestro product, por eso el segundo parámetro
  }

  updateProduct(id:string, changes: Partial<Product>){ // recibe solo una parte del objeto producto, este metodo es para modificar una parte del producto
    return this.http.put(`${environment.url_api}/products/${id}`, changes);
  }

  deleteProduct(id: string){
    return this.http.delete(`${environment.url_api}/products/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  getRandomUsers() :Observable<User[]>{
    return this.http.get('https://randomuserxdxdxd.me/api/?results=2')
    .pipe(
      retry(3),
      catchError(this.handleError), // sino ocurre ningun error con el link esta funcion no se ejecuta y sigue con la siguiente
      map((responde: any) => responde.results as User[]) // response es la respuesta, que me devolvera la llave que es results y que lo transformo a un array de usuarios para que me respete mi metodo
    );
  }

  private handleError(error: HttpErrorResponse) { // reciclo este codigo en cualquier lugar donde quiera poner advertencias de errores. Ejemplo ahora en el metodo deleteProduct
    console.log(error);
    Sentry.captureException(error);
    return throwError('ups algo salio mal');
  }
}