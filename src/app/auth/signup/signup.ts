import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterLink } from '@angular/router';

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirm  = control.get('confirmPassword');
  if (!password || !confirm || !confirm.value) return null;
  return password.value === confirm.value ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class SignupComponent {
  passwordTranslation = {
    'weak':'Debil',
    'fair':'Media',
    'strong':'Fuerte'
  }
  //pa moverle al form
  signupForm: FormGroup;

  //estados que se togglean en la interfaz pa mostrar cosas
  isLoading = signal(false);
  showPassword = signal(false);
  showConfirm  = signal(false);
  //otro estado para creaciond e cuentas
  step = signal(1);

  constructor(private fb: FormBuilder) {
    //campos del form con validacion de datos
    this.signupForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/(?=.*[A-Z])(?=.*[0-9])/)]],
      confirmPassword: ['', Validators.required],
    }, { validators: passwordMatchValidator });
  }

  //getters de los campos del form
  get fullName()        { return this.signupForm.get('fullName')!; }
  get email()           { return this.signupForm.get('email')!; }
  get password()        { return this.signupForm.get('password')!; }
  get confirmPassword() { return this.signupForm.get('confirmPassword')!; }

  //usa regex para calcular la fuerza de la contra
  get passwordStrength(): 'weak' | 'fair' | 'strong' {
    const v = this.password.value ?? '';
    if (v.length < 6) return 'weak';
    const checks = [/[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/, /.{10,}/];
    const passed = checks.filter(r => r.test(v)).length;
    if (passed <= 1) return 'weak';
    if (passed <= 2) return 'fair';
    return 'strong';
  }
  //valida datos del paso 1 y va al que sigue
  goToStep2() {
    this.fullName.markAsTouched();
    this.email.markAsTouched();
    if (this.fullName.valid && this.email.valid) {
      this.step.set(2);
    }
  }
  //simula crear la cuenta
  onSubmit() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
      console.log('Signup submitted:', this.signupForm.value);
      alert('Cuenta creada');
    }, 1500);
  }
}
