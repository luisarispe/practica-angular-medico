import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // INICIO EJEMPLO DE PROMESA BASICA
    // const promesa = new Promise((resolve, reject) => {

    //   if (false) {
    //     resolve("hola mundo");
    //   } else {
    //     reject('Algo salio mal');
    //   }


    // });
    // promesa.then((resp) => {
    //   console.log(resp)
    // }).catch(error => {
    //   console.log(error)
    // })
    // console.log("FIn del Init");
    // FIN EJEMPLO DE PROMESA BASICA
    this.GetUsuarios().then(usuarios => {
      console.log(usuarios);
    })
  }

  GetUsuarios() {
    const promesa = new Promise(resolve => {
      fetch('https://reqres.in/api/users').then(resp => resp.json()).then(body => resolve(body.data));
    });

    // fetch('https://reqres.in/api/users').then(resp => resp.json()).then(body => console.log(body.data));
    return promesa;
  }


}
