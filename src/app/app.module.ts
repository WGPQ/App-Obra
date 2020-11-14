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
        apiKey: "AIzaSyBrNaKvBugvcEIw6ZHWBre-7AREmkr0h24",
        authDomain: "db-app-obra.firebaseapp.com",
        databaseURL: "https://db-app-obra.firebaseio.com",
        projectId: "db-app-obra",
        storageBucket: "db-app-obra.appspot.com",
        messagingSenderId: "597832544254",
        appId: "1:597832544254:web:06186b25a8a7facf549aaf"
      }
    ),
    NgbModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
