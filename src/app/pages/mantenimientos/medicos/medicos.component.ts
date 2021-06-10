import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';
import { ModaImagenService } from '../../../services/moda-imagen.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit,OnDestroy {

  public cargando:boolean=true;
  public medicos:Medico[]=[];
  public imgSubs?:Subscription;
  constructor(private medicoService: MedicoService, private modalImagenService: ModaImagenService, private busquedaService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs=this.modalImagenService.nuevaImagen.subscribe(resp=> this.cargarMedicos())
  }
  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }

  cargarMedicos(){
    this.cargando=true;
    this.medicoService.cargarMedicos().subscribe(resp=>{
      this.medicos=resp;
      this.cargando=false;
    })
  }
  abrirModal(medico:Medico){
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }
  buscar(termino:string){
    if (termino.length == 0) {
      this.cargarMedicos()
    } else {
      this.busquedaService.buscar('medicos', termino).subscribe(resp => {
        console.log(resp);
        this.medicos = resp;
      })
    }
  }
  eliminarMedico(medico:Medico){
    Swal.fire({
      title: '¿Borrar Medico?',
      text: `Esta a punto de borrar el medico ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.borrarMedico(medico._id!).subscribe(resp=>{
          this.cargarMedicos();
          Swal.fire('Eliminado', medico.nombre, 'success')
        })
      }
    })
  }

}
