import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IOrderItem } from 'src/app/components/interfaces/IOrderItem';

export function createOrderItemForm(fb: FormBuilder, data: IOrderItem): FormGroup {
  return fb.group({
    orderId: [data.order ? data.order.id || '': Validators.required],
    productId: [data.product ? data.product.id || '': Validators.required],
    quantity: [data.quantity || '', [Validators.required, Validators.min(0)]],
    price: [data.price || '', [Validators.required, Validators.min(0)]]
  });
}