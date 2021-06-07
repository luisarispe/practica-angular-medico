import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModaImagenService } from 'src/app/services/moda-imagen.service';
import Swal from 'sweetalert2';
import { Hospital } from '../../../models/hospital.model';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit , OnDestroy{

  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  public imgSubs?:Subscription;
  constructor(private hospitalService: HospitalService, private modalImagenService: ModaImagenService, private busquedaService : BusquedasService) { }

  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarHospital();
    this.imgSubs=this.modalImagenService.nuevaImagen.subscribe(resp=> this.cargarHospital())
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

  async abrirSweetAlert(){
    const {value=''} = await Swal.fire<string>({
      text:'Ingrese un nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del Hospital',
      showCancelButton: true,
    })
    if(value!.trim().length>0){
      this.hospitalService.crearHospital(value!).subscribe(resp=>{
        this.cargarHospital();
      })
    }
  }
  abrirModal(hospital: Hospital) {
    console.log(hospital);
    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);
  }
  buscar(termino: string) {
    if (termino.length == 0) {
      this.cargarHospital()
    } else {
      this.busquedaService.buscar('hospitales', termino).subscribe(resp => {
        this.hospitales = resp;
      })
    }
  }



}
