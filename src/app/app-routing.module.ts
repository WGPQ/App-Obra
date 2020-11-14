import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardsGuard } from './seguridad/guards.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { ObraPageComponent } from './components/ObraComponets/obra-page/obra-page.component';
import { HomeObrePageComponent } from './components/ObraComponets/home-obre-page/home-obre-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { EditarAgregarPageComponent } from './components/ObraComponets/editar-agregar-page/editar-agregar-page.component';
import { MapaPageComponent } from './components/ObraComponets/mapa-page/mapa-page.component';
import { ViewPageComponent } from './components/ObraComponets/view-page/view-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegisterPageComponent },
  {
    path: 'home', component: HomeObrePageComponent, canActivate: [GuardsGuard],
    children: [
      { path: '', redirectTo: '/home/obra', pathMatch: 'full',canActivate: [GuardsGuard] },
      {path:'map',component:MapaPageComponent,canActivate: [GuardsGuard] },
      { path: 'obra', component: ObraPageComponent, canActivate: [GuardsGuard] },
      { path: 'editar/:id', component: EditarAgregarPageComponent, canActivate: [GuardsGuard] },
      { path: 'agregar', component: EditarAgregarPageComponent, canActivate: [GuardsGuard] },
      { path: 'ver', component: ViewPageComponent, canActivate: [GuardsGuard] }
    ]
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
