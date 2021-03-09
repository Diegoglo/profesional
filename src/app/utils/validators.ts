import { AbstractControl } from '@angular/forms'


export class MyValidators {

    static isPriceValid(control:AbstractControl){ // es el que va a tener valor
        const value =  control.value;
    if (value > 10000) {
        return {price_invalid : true}; // al error le ponemos un valor, agregandole un valor booleano
    } // retornamos este objeto si y solo si es invalido 
    return null;
    }
}