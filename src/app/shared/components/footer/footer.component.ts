import { Component, OnInit } from '@angular/core';

import { FormControl, Validators} from '@angular/forms'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  emailField: FormControl;

  constructor() { 
    this.emailField = new FormControl('diego',
      [
        Validators.required, // el campo no debe estar vacio
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)
      ]);

  // this.emailField.valueChanges // cada vez que el valor cambie
    //.subscribe(value => {
      //console.log(value);
    //})
  }

  ngOnInit() {
  }

  sendMail() {
    if (this.emailField.valid) {
      console.log(this.emailField.value);
    }
  }

}
