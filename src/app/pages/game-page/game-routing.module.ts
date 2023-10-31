import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamePageComponent } from './game-page.component';
import { CanActivateTeam } from "../../app.guard";

const routes: Routes = [
	{ path: '**', component: GamePageComponent, canActivate: [CanActivateTeam] },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class GameRoutingModule {}
