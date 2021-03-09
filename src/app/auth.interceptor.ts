import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenService} from './core/services/token.service'



@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService
  ) { }

  intercept(request : HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>>{
    request= this.addToken(request); // al request original lo vamos a reemplazarpor el metodo add token
    return next.handle(request); // respusta a la solicitud realizada
  }

  private addToken(request : HttpRequest<any>): HttpRequest<any>{
    const token= this.tokenService.getToken();
    console.log(token,'token');
    if (token){ // si tiene un token, hace la modificacion y lo recibe
      request = request.clone({ // clonamos el request(le decimos ahora que variables quiero que cambien)
        setHeaders: {
          token, // en los headers va a ver una variable llamada token y se la estoy enviando
        },
      });
      return request;
    }
    return request; // si no lo tiene retorna el mismo request
  }
}
