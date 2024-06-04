import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IOrder } from 'src/app/components/interfaces/IOrder';

export function createOrderForm(fb: FormBuilder, data: any): FormGroup {
  return fb.group({
    userId: [data.order.userId || '', Validators.required],
    total: [data.order.total || '', [Validators.required, Validators.min(0)]],
    discount: [data.order.discount || '', [Validators.required, Validators.min(0)]]
  });
}