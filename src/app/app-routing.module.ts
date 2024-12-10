import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from './auth/auth.guard'; // Import role guard for protected routes
import { AppComponent } from './app.component';
import { LoginComponent } from './common/login/login.component';
import { RegisterComponent } from './common/register/register.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { OtpComponent } from './common/otp/otp.component';
import { NotFoundComponent } from './common/notfound/notfound.component';
import { LandingComponent } from './common/landing/landing.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent }, // Public user profile route
  { path: 'login', component: LoginComponent }, // publice login route
  { path: 'register', component: RegisterComponent },
  { path: 'verify-otp', component: OtpComponent },
  { path: 'landing', component: LandingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
