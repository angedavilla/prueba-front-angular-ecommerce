import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/components/interfaces/IUser';

export function createUserForm(fb: FormBuilder, data: IUser): FormGroup {
  return fb.group({
    username: [data.user.username || '', Validators.required],
    email: [data.user.email || '', [Validators.required, Validators.email]],
    password: [data.user.password || '', Validators.required]
  });
}