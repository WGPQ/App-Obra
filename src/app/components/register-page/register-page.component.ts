import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from "src/app/model/user";
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  users: FormGroup;
  constructor(private router: Router,private service: FirebaseService, private toastr: ToastrService, private fb: FormBuilder) { 
    this.users = this.fb.group({
      email: ['', Validators.required],
      contrasenia: ['', Validators.required],
    })
  }
  user: User;
  listuser: User[];
  loading = false;

  ngOnInit(): void {
  }
registrarUser() {
    const user: User = {
      email: this.users.get('email').value,
      contrasenia: this.users.get('contrasenia').value
    };
    this.service.crearUser(user).then(() => {
      this.toastr.success("User creado exitosamente");
      this.users.reset();
      this.router.navigate(['/login']);
    }).catch(err => {
      this.toastr.error("Error: " + err.message);
    })
  }
}
