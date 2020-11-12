import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from "@angular/fire";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FirebaseService } from './services/firebase.service';
import { ObraPageComponent } from './components/obra-page/obra-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ObraPageComponent,
    RegisterPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
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
