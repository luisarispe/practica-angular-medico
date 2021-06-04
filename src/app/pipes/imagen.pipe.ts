import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment.prod';
const base_url=environment.base_url;
@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img?: string,tipo?:'hospitales' |'medicos' | 'usuarios' ): string {
    if(!img){
      return `${base_url}/upload/usuarios/no-image`;
    }

    if (img?.includes('https')) {
        return img;
    }
    if (img) {
        return `${base_url}/upload/${tipo}/${img}`;
    } else {
        return `${base_url}/upload/usuarios/no-image`;
    }
  }

}
