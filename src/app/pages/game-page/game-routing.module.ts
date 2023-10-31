import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamePageComponent } from './game-page.component';
import { CanGoToAppGuard } from "../../can-go-to-app.guard";

const routes: Routes = [
	{ path: '**', component: GamePageComponent, canActivate: [CanGoToAppGuard] },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class GameRoutingModule {}
