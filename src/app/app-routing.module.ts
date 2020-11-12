import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardsGuard } from './seguridad/guards.guard';
import { LoginComponent } from './components/login/login.component';
import { ObraPageComponent } from './components/obra-page/obra-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'obra', component: ObraPageComponent,canActivate:[GuardsGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
