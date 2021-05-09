import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSumitted = false;

  public registerForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    terminos: [false, Validators.required]
  }, {
    validators: this.passwordsIguales()
  } as AbstractControlOptions);

  constructor(private fb: FormBuilder) { }

  crearUsuario() {
    this.formSumitted = true;
    console.log(this.registerForm);
    if (this.registerForm.valid) {
      console.log('posteando algo');
    } else {
      console.log('Formulario no posteado');
    }
  }
  get getControl() {
    return this.registerForm.controls;
  }

  aceptaTerminos(campo: string): boolean {
    if (!this.registerForm.get(campo)?.value && this.formSumitted) {
      return true;
    } else {
      return false;
    }
  }
  passwordsIguales() {

    return (formGroup: FormGroup) => {

      const pass1Control = formGroup.controls['password'];
      const pass2Control = formGroup.controls['password2'];

      pass1Control?.value === pass2Control?.value ? pass2Control?.setErrors(null) : pass2Control?.setErrors({ noEsIgual: true })

    }
  }

}

