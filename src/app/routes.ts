import { Routes } from '@angular/router';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthguardService } from './services/authguard.service';

export const appRoutes: Routes = [
    { path: 'login', component: LoginpageComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthguardService] },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];