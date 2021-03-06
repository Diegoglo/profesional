import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs'; 
import { map,tap } from 'rxjs/operators';  // tap lo que hace es generar una interseccion entre un flujo de datos


import { AuthService } from './core/services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService
  ){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.hasUser().pipe(
    //tap(user => console.log(user)),
    map(user => user === null ? false : true)); 
  } // si tiene un usuario, y el usuario es igual a nulo entonces devuelva un false, sino un true
}
