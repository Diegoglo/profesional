import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { AngularFireAuth } from '@angular/fire/auth';
import { TokenService} from './token.service'
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { tap} from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( // cuando instancio aqui, instancio como dependencia
    private af: AngularFireAuth,
    private http: HttpClient,
    private token: TokenService
  ) { }

  createUser(email:string,password:string){
    return this.af.createUserWithEmailAndPassword(email,password);
  }

  loginUser(email:string, password:string){
    return this.af.signInWithEmailAndPassword(email,password);
  }

  logout(){
    return this.af.signOut();
  }

  hasUser(){ // tenemos un usuario?
    return this.af.authState;  // nos envía si hay o no un usuario(nos retorna un observable)
  }

  loginRestApi(email:string, password:string){
    return this.http.post('https://platzi-store.herokuapp.com/auth', { // post= autentificacion
    email,
    password // enviando estos datos encriptados
    })
    .pipe(
      tap((data: {token:string}) => { //tenemos la data que tiene un token de tipo string
        const token = data.token; // nos devuelve el token en una constante
        this.token.saveToken(token);
      })
    );
  }

}

