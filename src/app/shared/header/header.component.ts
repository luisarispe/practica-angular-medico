import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  public imgUrl:any='';
  constructor(private usuarioService: UsuarioService) {
    this.imgUrl=usuarioService.usuario?.imagenUrl;
   }

  ngOnInit(): void {
  }

  logOut() {
    this.usuarioService.logout();
  }

}
