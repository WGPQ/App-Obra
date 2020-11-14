import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Obra } from 'src/app/model/obra';

@Component({
  selector: 'app-mapa-page',
  templateUrl: './mapa-page.component.html',
  styleUrls: ['./mapa-page.component.css']
})
export class MapaPageComponent implements OnInit {
  @Output() dato = new EventEmitter<string>();
  lat: number;
  lng: number;
  zoom: number;
  mapTypeId: string;
  latObra = "";
  lonObra = "";
  listllena:boolean=false;
  markurl = '../../assets/markrs/';

  listObra: Obra[];
  constructor(private service: FirebaseService) {
    this.lat = -9.189967;
    this.lng = -75.015152;
    this.zoom = 6;
    this.mapTypeId = 'roadmap';
  }
  ngOnInit(): void {
    this.obtenerObra();
    
  }
  listavacia(){
    if(this.listObra!=null)
    this.listllena=true;
  }
  placeMarker($event) {
    this.lonObra = $event.coords.lng;
    this.latObra = $event.coords.lat;
    this.dato.emit($event);
  }

  obtenerObra() {
    this.service.ObtenerObras().subscribe(data => {
      this.listObra = data.map(o => {
        return {
          id: o.payload.doc.id,
          ...o.payload.doc.data() as {}
        } as Obra;
      });
    });
  }
}
