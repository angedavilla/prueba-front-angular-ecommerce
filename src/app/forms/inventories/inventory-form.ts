import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export function createInventoryForm(fb: FormBuilder, data: any): FormGroup {
    return fb.group({
      productId: [data.item.product ? data.item.product.id : '', Validators.required],
      quantity: [data.item.quantity || '', [Validators.required, Validators.min(0)]]
    });
  }