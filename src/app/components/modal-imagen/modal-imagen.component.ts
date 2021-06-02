import { Component, OnInit } from '@angular/core';
import { ModaImagenService } from 'src/app/services/moda-imagen.service';
import Swal from 'sweetalert2';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imageSubir?: File;
  public imgTemp: any = null;
  constructor(public modalImagenService: ModaImagenService, public fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.imgTemp = null
    this.modalImagenService.cerrarModal();
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
    const id=this.modalImagenService.id;
    const tipo=this.modalImagenService.tipo;

    this.fileUploadService.actualizarFoto(this.imageSubir!, tipo!, id!).then(img => {
      if (!img) {
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      } else {
        Swal.fire('Guardado', 'Imagen de usuario actualizada.', 'success');
        this.modalImagenService.nuevaImagen.emit(img);
        this.cerrarModal();
      }

    }).catch(err => {
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');
    })
  }

}
