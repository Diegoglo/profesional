import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { MyValidators } from './../../../utils/validators';

import { ProductsService } from './../../../core/services/products/products.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  form: FormGroup;
  id:string;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.activeRoute.params.subscribe((params: Params) => {
      this.id=params.id; // accedo al id obtenido y se lo asigno a una constante
      this.productsService.getProduct(this.id)
      .subscribe(product => {
        this.form.patchValue(product);
      });
    });  // me suscribo para obtener la respuesta 
  }
  

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const product = this.form.value;
      this.productsService.updateProduct(this.id, product)
      .subscribe((newProduct) => {
        console.log(newProduct);
        this.router.navigate(['./admin/products']);
      });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
      image: [''],
      description: ['', [Validators.required]],
    });
  }

  get priceField() {
    return this.form.get('price');
  }

}