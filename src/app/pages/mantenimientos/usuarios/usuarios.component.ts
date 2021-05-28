import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;

  constructor(private usuarioService: UsuarioService, private busquedaService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarUsuario();
  }
  cargarUsuario() {
    this.cargando = true;

    this.usuarioService.cargarUsuario(this.desde).subscribe(({ total, usuarios }) => {
      this.totalUsuarios = total;
      this.usuarios = usuarios;
      this.usuariosTemp = usuarios;
      this.cargando = false;
    })
  }

  cambiarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde > this.totalUsuarios) {
      this.desde -= valor;
    }
    this.cargarUsuario();
  }
  buscar(termino: string) {
    if (termino.length == 0) {
      this.usuarios = this.usuariosTemp;
    } else {
      this.busquedaService.buscar('usuarios', termino).subscribe(resp => {
        this.usuarios = resp;
      })
    }
  }
  eliminarUsuario(usuario:Usuario){

    if(usuario.uid==this.usuarioService.uid){
      Swal.fire('Error', 'No puede borrarse a si mismo');
      return;
    }

    Swal.fire({
      title: '¿Borrar Usuario?',
      text: `Esta a punto de borrar el usuario ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminandoUsuario(usuario).subscribe(resp=>{
          Swal.fire('Usuario borrado',
          `${usuario.nombre} fue eliminado correctamente.`,
          'success');
          this.cargarUsuario();
        });
      }
    })
  }

}
