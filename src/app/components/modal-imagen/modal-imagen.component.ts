import { Component, OnInit } from '@angular/core';
import { ModaImagenService } from 'src/app/services/moda-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imageSubir?: File;
  public imgTemp: any = null;
  constructor(public modalImagenService: ModaImagenService) { }

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

}
