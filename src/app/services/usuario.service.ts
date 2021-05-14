import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginFrom } from '../interfaces/login-form.interface';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  validarToken(): Observable<boolean>{
    const token= localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/login/renew`,{
      headers:{
        'x-token': token
      }
    }).pipe(
      tap((resp: any)=>{
        localStorage.setItem('token', resp.token)
      }),
      map((resp:any) => true)
    )
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData).
    pipe(
      tap((resp:any)=>{
        localStorage.setItem('token', resp.token)
      })
    );
  }
  login(datos: LoginFrom) {
    return this.http.post(`${base_url}/login`, datos).
    pipe(
      tap((resp:any)=>{
        localStorage.setItem('token', resp.token)
      })
    )
  }

  loginSign(token:string) {
    return this.http.post(`${base_url}/login/google`, {token}).
    pipe(
      tap((resp:any)=>{
        localStorage.setItem('token', resp.token)
      })
    )
  }

}
