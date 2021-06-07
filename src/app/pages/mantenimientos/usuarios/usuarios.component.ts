import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';
import { ModaImagenService } from '../../../services/moda-imagen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;
  public imgSubs?:Subscription;
  constructor(private usuarioService: UsuarioService, private busquedaService: BusquedasService, private modalImagenService: ModaImagenService) { }
  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuario();
    this.imgSubs=this.modalImagenService.nuevaImagen.subscribe(resp=> this.cargarUsuario())
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
        this.usuarios = resp as Usuario[];
      })
    }
  }
  eliminarUsuario(usuario: Usuario) {

    if (usuario.uid == this.usuarioService.uid) {
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
        this.usuarioService.eliminandoUsuario(usuario).subscribe(resp => {
          Swal.fire('Usuario borrado',
            `${usuario.nombre} fue eliminado correctamente.`,
            'success');
          this.cargarUsuario();
        });
      }
    })
  }
  cambiarRole(usuario: Usuario) {
    console.log(usuario);
    this.usuarioService.actualizarUsuario(usuario).subscribe(resp => {
      console.log(resp);
    })
  }
  abrirModal(usuario: Usuario) {
    console.log(usuario);
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
  }

}
