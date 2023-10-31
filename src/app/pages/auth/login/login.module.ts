import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CanGoToLoginGuard } from "../../../can-go-to-login.guard";
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
  providers: [CanGoToLoginGuard],
})

export class LoginModule { }
