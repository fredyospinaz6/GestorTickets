import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

// Componentes
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

// Guards
import { AuthGuard } from './utils/auth.guard';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { ListTicketsComponent } from './components/list-tickets/list-tickets.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'login-admin', component: LoginAdminComponent },
  { path: 'dashboard-admin', component: DashboardAdminComponent },
  { path: 'consultar-ticket', component: ListTicketsComponent },
  { path: 'signIn', component: SignInComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'crearticket', component: FormularioComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
