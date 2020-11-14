import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from "src/app/model/user";
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users: FormGroup;
  constructor(private router: Router, private service: FirebaseService, private toastr: ToastrService, private fb: FormBuilder) {
    this.users = this.fb.group({
      email: ['', Validators.required],
      contrasenia: ['', Validators.required],
    })
  }
  user: User;
  listuser: User[];
  loading = false;

  ngOnInit(): void {
    if(localStorage.getItem('usuario_actual')!=null){
      this.router.navigate(['/home/obra']);
    }
  }

  inicarSession() {
    const user: User = {
      email: this.users.get('email').value,
      contrasenia: this.users.get('contrasenia').value
    };
    this.service.IniciarSeeion(user).then(() => {
      this.users.reset();
      localStorage.setItem('usuario_actual',user.email);
      this.router.navigate(['/home']);
    }).catch(err => {
      this.toastr.error("Error: " + err.message);
    })
  }
}
