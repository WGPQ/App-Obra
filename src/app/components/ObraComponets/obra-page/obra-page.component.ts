import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Obra } from 'src/app/model/obra';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-obra-page',
  templateUrl: './obra-page.component.html',
  styleUrls: ['./obra-page.component.css']
})
export class ObraPageComponent implements OnInit {
  constructor(private router: Router, private toastr: ToastrService, private service: FirebaseService) {
  }
  listObra: Obra[];

  ngOnInit(): void {
    this.obtenerObra();
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
  
  VerObra(id:string){
    this.router.navigate(['/home/ver'],{queryParams:{obra:id}})
  }
  editObra(id:string){
    this.router.navigate(['/home/editar/'+id])
  }
}
