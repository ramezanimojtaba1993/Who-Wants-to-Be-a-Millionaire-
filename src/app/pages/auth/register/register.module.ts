import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CanGoToAppGuard } from '../../../can-go-to-app.guard';
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
  providers: [CanGoToAppGuard],
})
export class RegisterModule { }
