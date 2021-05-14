import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    recordar: [false]
  });

  constructor(private router: Router, private fb: FormBuilder, private usuarioService: UsuarioService) { }

  get getControl() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.renderButton();
  }
  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.usuarioService.login(this.loginForm.value).subscribe(resp => {
      if (this.loginForm.get('recordar')?.value) {
        localStorage.setItem('email', this.loginForm.get('email')?.value);
      } else {
        localStorage.removeItem('email');
      }
    }, error => {
      Swal.fire('', 'Usuario/Contraseña Incorrecto.', 'info')
    });
    // console.log(this.loginForm.value);
  }

  onSuccess(googleUser: any) {
    // console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    var id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token);
  }
  onFailure(error: any) {
    console.log(error);
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.onSuccess,
      'onfailure': this.onFailure
    });
  }


}
