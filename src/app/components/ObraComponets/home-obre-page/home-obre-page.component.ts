import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-home-obre-page',
  templateUrl: './home-obre-page.component.html',
  styleUrls: ['./home-obre-page.component.css']
})
export class HomeObrePageComponent implements OnInit {

  constructor(private router: Router, private service: FirebaseService) { }
  useremail: string;
  ngOnInit(): void {
    this.useremail = localStorage.getItem('usuario_actual');
  }
  cerrarSession() {
    this.service.cerrarSession();
    this.router.navigate(['/']);
  }

}
