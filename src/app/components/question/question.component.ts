import { Component, Input, OnInit } from '@angular/core';
import { AnswerItem, QuestionSheet } from 'src/app/model/question.model';

@Component({
	selector: 'app-question',
	templateUrl: './question.component.html',
	styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
	@Input() question: QuestionSheet;
	@Input() questionSheet: QuestionSheet[];

	ngOnInit(): void {}

	setResult(answerId: number, questionId: number): void {
    const thisQuestion = this.questionSheet.find(item => item.id === questionId);
    const thisAnswer = thisQuestion.answers.find(item => item.id === answerId);

    if (thisAnswer.state !== 'clicked') {
      thisAnswer.state = 'clicked';
    } else {
      thisAnswer.state = 'unClicked';
    }
	}

  getAnswerBgColor(answer: AnswerItem): string {
    if (!answer.serverState) {
      return answer.state === 'clicked' ? 'btn-info' : 'btn-light';
    } else {
      if (answer.state === 'clicked' && answer.serverState === 'correct') {
        return 'btn-success';
      } else if (answer.state !== 'clicked' && answer.serverState === 'correct') {
        return 'border-success';
      } else if (answer.state === 'clicked' && answer.serverState === 'inCorrect') {
        return 'btn-danger';
      }
    }
    return '';
  }
}
