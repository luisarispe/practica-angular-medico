import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/hospital.service';
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



}
