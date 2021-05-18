import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {
  public usuario?: Usuario;

  public perfilForm = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });



  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.usuario = usuarioService.usuario;
    this.perfilForm.setValue({ 'nombre': this.usuario?.nombre, 'email': this.usuario?.email })
  }

  ngOnInit(): void {
  }

  actualizarPerfil() {
    console.log(this.perfilForm?.value);
    this.usuarioService.actualizarPerfil(this.perfilForm.value).subscribe(resp => {
      const { nombre, email } = this.perfilForm.value;
      this.usuario!.nombre = nombre;
      this.usuario!.email = email;
    })
  }

}
