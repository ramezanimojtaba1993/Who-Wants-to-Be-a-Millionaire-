import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CanActivateTeam } from '../../../app.guard';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from "./register-routing.module";

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    RegisterRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CanActivateTeam],
})
export class RegisterModule { }
