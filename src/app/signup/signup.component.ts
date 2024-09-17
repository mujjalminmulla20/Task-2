import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  public signupForm: FormGroup;
  public isFormSubmit = false;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]],
    });
  }

  onSubmit() {
    this.isFormSubmit = true;
    if (this.signupForm.valid) {
      const user = this.signupForm.value;
      this.apiService.signup(user).subscribe(
        (response: any) => {
          if (response.success) {
            this.router.navigate(['/login']);
          } else {
            alert('Signup failed');
          }
        },
        (error) => {
          console.error('Signup failed', error);
        }
      );
    }
  }

  get valid() {
    return this.signupForm.controls;
  }
}
