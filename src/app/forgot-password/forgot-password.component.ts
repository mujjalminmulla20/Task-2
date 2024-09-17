import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
public  forgotPasswordForm: any;
 public isFormSubmit = false;
 isDisabled = true;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]],
    });
  }

  onForgotPasswordSubmit(): void {
    this.isFormSubmit = true;
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email;
      console.log('Email submitted:', email);
     
    }
    
  }




  navigateToSignup() {
    if (!this.isDisabled) {
      this.router.navigate(['/signup']);
    }
  }


  get valid(){
    return this.forgotPasswordForm.controls
  }
}
