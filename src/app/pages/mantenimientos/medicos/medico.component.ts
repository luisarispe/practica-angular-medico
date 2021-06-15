import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import Swal from 'sweetalert2';
import { HospitalService } from '../../../services/hospital.service';
import { MedicoService } from '../../../services/medico.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CargarUsuario } from '../../../interfaces/cargar-usuarios.interface';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSelecciona?:Hospital;
  public medicoSeleccionado?:Medico;
  constructor(private fb: FormBuilder, private hospitalService: HospitalService, private medicoService: MedicoService, private router:Router,private activateRouter: ActivatedRoute) { }

  ngOnInit(): void {

    this.activateRouter.params.subscribe(({id})=>{
      this.cargarMedico(id)
    })

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    })
    this.cargarHospitales()

    this.medicoForm.get('hospital')?.valueChanges.subscribe(hospitalId=>{
      
        this.hospitalSelecciona=this.hospitales.find(h=>h._id===hospitalId)
    })
  }
  cargarMedico(id:string){
    this.medicoService.obtenerMedicoPorId(id).subscribe(medico=>{
      this.medicoSeleccionado=medico;
    })
  }
  cargarHospitales() {
    this.hospitalService.cargarHospitales().subscribe((hospitales: Hospital[]) => {
      this.hospitales = hospitales;
    })
  }

  guardarMedico() {
    this.medicoService.crearMedico(this.medicoForm.value).subscribe((resp:any)=>{
      Swal.fire('','médico creado correctamente.', 'success');
      this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`)
    });
    
  }


}
