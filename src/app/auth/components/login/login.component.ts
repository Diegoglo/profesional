import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

import {} from './../../../core/services/cart.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.buildForm();
  }

  ngOnInit() {
  }

  login(event: Event) {
    event.preventDefault();
    if (this.form.valid){
      const value= this.form.value;
      this.authService.loginUser(value.email,value.password)
      .then (() => { // si es valido
        this.router.navigate(['/admin']);
      })
      .catch(() =>{
      alert('no es valido'); // si el usuario no es valido
    });
    }
  }

  loginApi(){
    this.authService.loginRestApi('diego55@gmail.com', '82565170')
    .subscribe(data => {
      console.log(data);
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

}