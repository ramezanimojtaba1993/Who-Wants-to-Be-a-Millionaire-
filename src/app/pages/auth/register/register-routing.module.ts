import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { CanGoToAppGuard } from '../../../app.guard';
import { RegisterComponent } from './register.component';

const routes: Routes = [
	{ path: '**', component: RegisterComponent/*, canActivate: [CanGoToAppGuard]*/ },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class RegisterRoutingModule {}
