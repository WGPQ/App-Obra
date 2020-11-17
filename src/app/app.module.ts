import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from "@angular/fire";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FirebaseService } from './services/firebase.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeObrePageComponent } from "./components/ObraComponets/home-obre-page/home-obre-page.component";
import { EditarAgregarPageComponent } from './components/ObraComponets/editar-agregar-page/editar-agregar-page.component';
import { ViewPageComponent } from './components/ObraComponets/view-page/view-page.component';
import { ObraPageComponent } from './components/ObraComponets/obra-page/obra-page.component';
import { MapaPageComponent } from './components/ObraComponets/mapa-page/mapa-page.component';
import { AgmCoreModule } from '@agm/core';
import { Key } from 'protractor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ObraPageComponent,
    RegisterPageComponent,
    EditarAgregarPageComponent,
    ViewPageComponent,
    HomeObrePageComponent,
    MapaPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AgmCoreModule.forRoot(
      {
        apiKey:'AIzaSyDaR8IQhLf4YGJTo9kJ3xkEB2ioK_p2Lio'
      }
    ),
    AngularFireModule.initializeApp(
      {
        apiKey: "AIzaSyBLrT1sqI9-r16oBGYLeRPfommXNWSvuW8",
        authDomain: "db-app-obra-500f9.firebaseapp.com",
        databaseURL: "https://db-app-obra-500f9.firebaseio.com",
        projectId: "db-app-obra-500f9",
        storageBucket: "db-app-obra-500f9.appspot.com",
        messagingSenderId: "513803386954",
        appId: "1:513803386954:web:202d0a500a84c516c426b3",
        measurementId: "G-ZE2L6GPDM8"
      }
    ),
    NgbModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
