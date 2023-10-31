import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CanActivateTeam } from '../../../app.guard';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from "./login-routing.module";

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CanActivateTeam],
})

export class LoginModule { }
