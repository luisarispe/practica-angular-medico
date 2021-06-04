import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/hospital.service';
import Swal from 'sweetalert2';
import { Hospital } from '../../../models/hospital.model';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  public hospitales: Hospital[] = [];
  public cargando: boolean = true;

  constructor(private hospitalService: HospitalService) { }

  ngOnInit(): void {
    this.cargarHospital();

  }

  cargarHospital() {

    this.cargando = true;
    this.hospitalService.cargarHospitales().subscribe(resp => {
      this.hospitales = resp;
      this.cargando = false;
    })
  }
  guardarCambios(hospital: Hospital){
    this.hospitalService.actualizarHospital(hospital._id!, hospital.nombre).subscribe(resp=>{
      console.log(resp);
      Swal.fire('Actualizado', hospital.nombre, 'success');
    })
  }

  eliminarHospital(hospital: Hospital){
    
    Swal.fire({
      title: '¿Borrar Hopital?',
      text: `Esta a punto de borrar el hospital ${hospital.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalService.borrarHospital(hospital._id!).subscribe(resp=>{
          this.cargarHospital();
          Swal.fire('Eliminado', hospital.nombre, 'success')
        })
      }
    })
    
  }



}
