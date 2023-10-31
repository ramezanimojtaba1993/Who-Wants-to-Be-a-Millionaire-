import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { CanGoToLoginGuard } from "../../../can-go-to-login.guard";

const routes: Routes = [
  {path: '**', component: LoginComponent, canActivate: [CanGoToLoginGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {
}
