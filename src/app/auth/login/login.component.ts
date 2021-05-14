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

  public auth2:any;

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
  // var id_token = googleUser.getAuthResponse().id_token;
  // onSuccess(googleUser: any) {
  //   // console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    
  //   console.log(id_token);
  // }
  // onFailure(error: any) {
  //   console.log(error);
  // }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      
    });
    this.startApp();
  }
  startApp(){
    gapi.load('auth2', ()=>{
      this.auth2 = gapi.auth2.init({
        client_id: '889576422118-8rld2s5240mjm3u98sk7od8gkdue4h6m.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  };
  attachSignin(element:any) {
    this.auth2.attachClickHandler(element, {},
        (googleUser:any) =>{
          var id_token = googleUser.getAuthResponse().id_token;
          this.usuarioService.loginSign(id_token).subscribe(resp=>{
            console.log(resp);
          });
        }, function(error :any) {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

}
