import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'register', loadChildren: async () => (await import('./pages/auth/register/register.module')).RegisterModule },
  { path: 'login', loadChildren: async () => (await import('./pages/auth/login/login.module')).LoginModule },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
