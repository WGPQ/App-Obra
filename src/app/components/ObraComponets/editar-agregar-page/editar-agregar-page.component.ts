import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Obra } from 'src/app/model/obra';
import { ToastrService } from 'ngx-toastr';
import { Route } from '@angular/compiler/src/core';
@Component({
  selector: 'app-editar-agregar-page',
  templateUrl: './editar-agregar-page.component.html',
  styleUrls: ['./editar-agregar-page.component.css']
})
export class EditarAgregarPageComponent implements OnInit {


  obras: FormGroup;
  modelini: NgbDateStruct;
  modelfin: NgbDateStruct;
  submitType: string = "Guardar";
  latObra: string = "";
  lngObra: string = "";
  action = "Agregar";
  listObra: Obra[];
  obra: Obra;
  idObra: string;
  constructor(private router: Router, private route: ActivatedRoute, private toastr: ToastrService, private service: FirebaseService, private calendar: NgbCalendar, private fb: FormBuilder) {
    this.obras = this.fb.group({
      nombre: ['', Validators.required],
      lat: [''],
      lon: [''],
      descripcion: ['', Validators.required],
      fecha_ini: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      marcador: ['', Validators.required],
      otroDato: ['', Validators.required],
    });
    if (this.route.snapshot.paramMap.get('id') != null) {
      this.idObra = this.route.snapshot.paramMap.get('id');
    }
  }


  ngOnInit(): void {
    this.editObra();
  }

  funtionCamb(e) {
    this.latObra = e.coords.lat;
    this.lngObra = e.coords.lng;
  }
  guardarObra() {
    if (this.action == 'Agregar') {
      const obra: Obra = {
        nombre: this.obras.get('nombre').value,
        lat: this.latObra,
        lon: this.lngObra,
        descripcion: this.obras.get('descripcion').value,
        fecha_ini: this.obras.get('fecha_ini').value,
        fecha_fin: this.obras.get('fecha_fin').value,
        marcador: this.obras.get('marcador').value,
        otroDato: this.obras.get('otroDato').value,
      };
      this.service.crearObra(obra).then(data => {
        this.toastr.success("Obra ingresada correctamente");
        this.obras.reset();
        this.router.navigate(['/home/obra']);
      }, err => {
        this.toastr.error("Error: " + err.message);
      });
    } else {
      const obra: Obra = {
        nombre: this.obras.get('nombre').value,
        lat: this.obras.get('lat').value,
        lon: this.obras.get('lon').value,
        descripcion: this.obras.get('descripcion').value,
        fecha_ini: this.obras.get('fecha_ini').value,
        fecha_fin: this.obras.get('fecha_fin').value,
        marcador: this.obras.get('marcador').value,
        otroDato: this.obras.get('otroDato').value,
      };
      this.service.UpdateObra(this.idObra, obra).then(data => {
        this.toastr.success("Obra actualizada correctamente");
        this.obras.reset();
        this.router.navigate(['/home/obra']);
      }, err => {
        this.toastr.error("Error: " + err.message);
      })
    }
  }

  editObra() {
    if (this.idObra != null) {
      this.action = "Editar"
    this.submitType = "Actualizar";
      this.service.ObtenerObra(this.idObra).subscribe(data => {
        this.obra = data.payload.data() as Obra;
        this.obras.patchValue({
          nombre: this.obra.nombre,
          lat: this.obra.lat,
          lon: this.obra.lon,
          descripcion: this.obra.descripcion,
          fecha_ini: this.obra.fecha_ini,
          fecha_fin: this.obra.fecha_fin,
          marcador: this.obra.marcador,
          otroDato: this.obra.otroDato,
        });
      }, err => {
        console.log(err.message);
      });
    }


  }

}
