import { Component } from '@angular/core';
import { RegisterForm } from '../auth';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form: FormGroup;

  constructor(private authService: AuthService,private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      comfirm_password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  
  submit() {
    if (this.form.valid) {
      const { email, password, comfirm_password } = this.form.value;
      this.authService.isValid(email, password).subscribe((isValid) => {
        if (isValid) {
          // tìm thấy
          alert('Đã tồn tại email này');
        } else {
          this.authService.register(this.form.value);
        }
      });
    }
  }
}
