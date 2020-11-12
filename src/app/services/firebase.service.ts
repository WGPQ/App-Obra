import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { rejects } from 'assert';
import { from, Observable } from 'rxjs';
import{GeoJson} from '../model/map'
import * as mapboxgl from 'mapbox-gl'
import { Obra } from '../model/obra';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firebaseAuth: AngularFireAuth, private firestore: AngularFirestore) {
    mapboxgl.accessToken='pk.eyJ1Ijoid2lsbGlhbXB1bWEiLCJhIjoiY2thMG80dmFlMDV3MzNubWs2b3Qyd2ZnciJ9.w52N7mQ-m64_-ysrI1O1iQ';
  }

  async crearUser(user: User) {
    return await this.firebaseAuth.createUserWithEmailAndPassword(user.email, user.contrasenia);
  }

  async IniciarSeeion(user: User) {
    return await this.firebaseAuth.signInWithEmailAndPassword(user.email, user.contrasenia);
  }
  cerrarSession() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('usuario_actual');
  }
  crearObra(obra: Obra) {
    return this.firestore.collection('tblObra').add(obra);
  }
  ObtenerObras() {
    return this.firestore.collection('tblObra').snapshotChanges();
  }
  ObtenerObra(id:string) {
    return this.firestore.collection('tblObra').doc(id).snapshotChanges();
  }
  DeleteObra(idObra: string) {
    return this.firestore.doc('tblObra/' + idObra).delete();
  }
  UpdateObra(id:string,obra:Obra){
    return this.firestore.doc('tblObra/'+id).update(obra);
  }

  getMarks(){

  }
}
