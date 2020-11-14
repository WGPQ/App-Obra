import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Obra } from 'src/app/model/obra';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.css']
})
export class ViewPageComponent implements OnInit {
  constructor( private toastr: ToastrService,private route: ActivatedRoute, private service: FirebaseService, private router: Router) { }
  obra: Obra = {
    nombre: "",
    lat: "",
    lon: "",
    descripcion: "",
    fecha_ini: new Date(),
    fecha_fin: new Date(),
    marcador: "azul.svg",
    otroDato: "",
  };
  fecha = new Date();
  idObra:string;
  loading = false;
  ngOnInit(): void {
    this.obtenerObra();
  }
  obtenerObra() {
    this.loading = true;
    this.route.queryParams.subscribe(resp => {
      if (resp['obra'] != null) {
        this.idObra = resp['obra'];
        this.service.ObtenerObra(this.idObra).subscribe(data => {
          this.obra = data.payload.data() as Obra;
          let fecha=this.obra.fecha_ini;
          console.log(fecha);
          this.loading = false;
          if (this.obra == null)
            this.router.navigate(['/home/obra']);
        });
      } else {
        this.router.navigate(['/home/obra']);
      }
    }, err => {
      console.log(err);
    });

  }
  deleteObra(id:string) {
    this.service.DeleteObra(id).then(resp => {
      this.toastr.success("Obra eliminada correctamente");
      this.router.navigate(['/home/obra']);
    }, err => {
      this.toastr.success("Error: " + err.message);
    })
  }

}
