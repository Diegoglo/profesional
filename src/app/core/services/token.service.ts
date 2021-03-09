import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token:string){
    localStorage.setItem('token',token); // en nuestro almacenamiento web, vamos a almacenar informacion respecto al token
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
