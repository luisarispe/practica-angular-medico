import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';
import { switchAll } from 'rxjs/operators';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {
  public usuario?: Usuario;
  public imageSubir?: File;
  public imgTemp: any = null;
  public perfilForm = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });



  constructor(private fb: FormBuilder, private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService) {
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

      Swal.fire('Guardado', 'Cambios fueron guardados.', 'success');
    }, (error) => {
      Swal.fire('Error', error.error.msg, 'error');
    })
  }
  cambiarImagen(event: any) {
    this.imageSubir = event.currentTarget.files[0];

    if (!event.currentTarget.files[0]) {
      this.imgTemp = null;
      return
    }
    const reader = new FileReader();
    reader.readAsDataURL(event.currentTarget.files[0]);
    reader.onload = () => {
      this.imgTemp = reader.result;
    }

  }
  subirImagen() {
    this.fileUploadService.actualizarFoto(this.imageSubir!, 'usuarios', this.usuario?.uid!).then(img => {
      if (!img) {
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      } else {
        this.usuario!.img = img;
        Swal.fire('Guardado', 'Imagen de usuario actualizada.', 'success');
      }

    }).catch(err => {
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');
    })
  }

}
