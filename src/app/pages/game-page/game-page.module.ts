import { NgModule } from '@angular/core';
import { CanGoToAppGuard } from '../../can-go-to-app.guard';
import { GamePageComponent } from './game-page.component';
import { GameRoutingModule } from "./game-routing.module";
import { CommonModule } from '@angular/common';
import { QuestionComponent } from '../../components/question/question.component'

@NgModule({
  declarations: [
    GamePageComponent,
    QuestionComponent
  ],
  imports: [
    GameRoutingModule,
    CommonModule
  ],
  providers: [CanGoToAppGuard],
})
export class GameModule { }
