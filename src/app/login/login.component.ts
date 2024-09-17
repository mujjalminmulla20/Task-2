import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  [x: string]: any;
  loginForm: any;
  public isFormSubmit = false;
  
  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
  
  onSubmit() {
    this.isFormSubmit = true;
  
    if (this.loginForm.invalid) {
      return;
    }
  
    const credentials = this.loginForm.value;
    this.apiService.login(credentials).subscribe(
      (response: any) => {
        if (response.success) {
          this.router.navigate(['/dashboard']);
        } else {
          alert('Invalid credentials');
        }
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
  

  togglePasswordVisibility() {
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const passwordToggle = document.getElementById('togglePassword') as HTMLElement;

    this['isPasswordVisible'] = !this['isPasswordVisible'];
    
    if (this['isPasswordVisible']) {
      passwordInput.type = 'text'; 
      passwordToggle.classList.remove('fa-eye');
      passwordToggle.classList.add('fa-eye-slash'); 
    } else {
      passwordInput.type = 'password'; // Hide password
      passwordToggle.classList.remove('fa-eye-slash');
      passwordToggle.classList.add('fa-eye'); 
    }
  }




  get valid() {
    return this.loginForm.controls;
  }
}  