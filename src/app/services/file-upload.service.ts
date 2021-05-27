import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string
  ) {
    try {
      const url = `${base_url}/upload/${tipo}/${id}`;
      const forData = new FormData();
      forData.append('imagen', archivo);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: forData
      })
      const data = await resp.json();

      if (data.ok) {
        return data.nombreArchivo;
      } else {
        return false;
      }

    } catch (error) {
      return false;
    }
  }

}