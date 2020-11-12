import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Obra } from 'src/app/model/obra';
import { ToastrService } from 'ngx-toastr';
import { GeoJson, FutureCollections } from '../../model/map'
import * as mapboxgl from 'mapbox-gl'
import { positionService } from '@ng-bootstrap/ng-bootstrap/util/positioning';
import { right } from '@popperjs/core';
@Component({
  selector: 'app-obra-page',
  templateUrl: './obra-page.component.html',
  styleUrls: ['./obra-page.component.css']
})
export class ObraPageComponent implements OnInit {
  obras: FormGroup;
  modelini: NgbDateStruct;
  modelfin: NgbDateStruct;
  constructor(private router: Router, private toastr: ToastrService, private service: FirebaseService, private calendar: NgbCalendar, private fb: FormBuilder) {
    this.obras = this.fb.group({
      nombre: ['', Validators.required],
      lat: ['', Validators.required],
      lon: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha_ini: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      marcador: ['', Validators.required],
      otroDato: ['', Validators.required],
    })
  }
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = -9.189967;
  lon = -75.015152;
  mensaje = 'Agregar';
  submitType: string = "Guardar";
  latObra = "";
  lonObra = "";
  action = "Agregar";
  listObra: Obra[];
  obra: Obra;
  idObra: string;
  date: { year: number, month: number };
  useremail: string;
  source: any;
  markes: any;
  ngOnInit(): void {
    this.useremail = localStorage.getItem('usuario_actual');
    this.obtenerObra();
    this.markes = this.service.ObtenerObras;
    this.inicializarMap();
  }
  inicializarMap() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
        this.map.flyTo({
          center: [this.lon, this.lat]
        })
      });
    }
    this.buildMap();
  }
  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 4,
      center: [this.lon, this.lat]
    });
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.on('click', (event) => {
      const coordinates = [event.lngLat.lng, event.lngLat.lat]
      const newMarker = new GeoJson(coordinates, { message: this.mensaje });
      this.lonObra = event.lngLat.lng;
      this.latObra = event.lngLat.lat;
      console.log(newMarker);
    })

    this.map.on('load', (event) => {
      this.map.addSource('firebase', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          futures: []
        }
      });
      this.source = this.map.getSource('firebase');
      console.log(this.source);
      this.markes.subscribe(markes => {
        let data = new FutureCollections(markes);
        this.source.setData(data);
      });
      this.map.addLayer({
        id:'firebase',
        source:'firebase',
        type:'symbol',
      })
    });
  }

  selectToday() {
    this.modelini = this.calendar.getToday();
  }
  cerrarSession() {
    this.service.cerrarSession();
    this.router.navigate(['/login']);
  }
  nuevaObra() {
    this.obras.reset();
    this.action = "Agregar"
    this.submitType = "Guardar";
  }
  guardarObra() {
    if (this.action == 'Agregar') {
      const obra: Obra = {
        nombre: this.obras.get('nombre').value,
        lat: this.latObra,
        lon: this.lonObra,
        descripcion: this.obras.get('descripcion').value,
        fecha_ini: this.obras.get('fecha_ini').value,
        fecha_fin: this.obras.get('fecha_fin').value,
        marcador: this.obras.get('marcador').value,
        otroDato: this.obras.get('otroDato').value,
      };
      this.service.crearObra(obra).then(data => {
        this.toastr.success("Obra ingresada correctamente");
        this.obtenerObra();
        this.obras.reset();
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
        this.obtenerObra();
        this.obras.reset();
      }, err => {
        this.toastr.error("Error: " + err.message);
      })
    }


  }
  obtenerObra() {
    this.service.ObtenerObras().subscribe(data => {
      this.listObra = data.map(o => {
        return {
          id: o.payload.doc.id,
          ...o.payload.doc.data() as {}
        } as Obra;
      })
    });
  }
  deleteObra(id: string) {
    this.service.DeleteObra(id).then(resp => {
      this.toastr.success("Obra eliminada correctamente");
    }, err => {
      this.toastr.success("Error: " + err.message);
    })
  }
  editObra(id: string) {
    this.action = "Editar";
    this.submitType = "Actualizar";
    this.idObra = id;
    this.service.ObtenerObra(id).subscribe(data => {
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
