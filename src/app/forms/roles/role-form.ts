import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Data, IRole } from 'src/app/components/interfaces/IRoles';

export function createRoleForm(fb: FormBuilder, data: Data): FormGroup {
  return fb.group({
    name: [data.role.name || '', Validators.required]
  });
}