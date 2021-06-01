import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ModaImagenService {

  private _ocultarModal: boolean = true;
  public tipo?: 'usuarios' | 'medicos' | 'hospitales';
  public id?: string;
  public img?: string;

  get ocultartModal() {
    return this._ocultarModal;
  }
  abrirModal(tipo?: 'usuarios' | 'medicos' | 'hospitales', id?: string, img: string = 'no-img') {
    this.tipo = tipo;
    this.id = id;
    if (img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${base_url}/upload/${tipo}/${img}`;

    }
    this._ocultarModal = false;
  }

  cerrarModal() {
    this._ocultarModal = true;
  }
  constructor() { }
}
