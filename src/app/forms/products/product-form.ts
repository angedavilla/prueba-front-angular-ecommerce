import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProduct } from 'src/app/components/interfaces/IProduct';

export function createProductForm(fb: FormBuilder, data: IProduct): FormGroup {
  return fb.group({
    name: [data.product.name || '', Validators.required],
    description: [data.product.description || '', Validators.required],
    price: [data.product.price || '', Validators.required],
    active: [data.product.active || false]
  });
}