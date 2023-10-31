import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { QuestionService } from './question.service';
import { Answer, QuestionSheet } from 'src/app/model/question.model';

declare const bootstrap: any;
@Component({
	selector: 'app-game-page',
	templateUrl: './game-page.component.html',
	styleUrls: ['./game-page.component.scss'],
})
export class GamePageComponent implements OnInit {
	@ViewChild('carousel') carouselElm: ElementRef;

	private _carousel: any = null;
	private get carousel(): any {
		this._carousel = new bootstrap.Carousel(this.carouselElm.nativeElement);
		return this._carousel;
	}

  isGameStarted = false;
  isGameFinished = false;

  questionSheet: QuestionSheet[] = [];

	currentQuestion: QuestionSheet;
  currentIndex: number = 0;
	message: string;
  achievedScore = 0;

	constructor(private questionService: QuestionService) {}

	ngOnInit() {
		this.getData();
	}

	async next() {
		if (this.isAllowedToNext()) {
      this.currentQuestion.loading = true;
      await this.getCorrectAnswer(this.currentQuestion.id);
      this.currentQuestion.loading = false;
      this.disabledAllAnswers(this.currentQuestion.id);

      const goNext = () => {
        this.carousel.next();
        this.currentIndex++;
        this.setCurrentQuestion();
      }

      if (!this.currentQuestion.isSeen) {
        this.startTimer();
        setTimeout(() => {
          goNext();
        }, this.seconds * 1000)
      } else {
        goNext();
      }

		}
	}

	prev(): void {
    this.getPreviousQuestion().isSeen = true;
    this.carousel.prev();
    this.currentIndex--;
    this.setCurrentQuestion();
	}

  getPreviousQuestion(): QuestionSheet {
    return this.questionSheet[this.currentIndex - 1];
  }

  disabledAllAnswers(questionId: number): void {
    const thisQuestion = this.questionSheet.find(question => question.id === questionId);
    const answers = thisQuestion.answers;

    for (let i = 0; i < answers.length; i++) {
      answers[i].disabled = true;
    }

  }

	private isAllowedToNext(): boolean {
		this.clearMessage();

    const thisQuestion = this.questionSheet.find(question => question.id === this.currentQuestion.id);

    const hasAtLeastOneClicked = (question: QuestionSheet) => {
      let clicked = false;
      for (let i = 0; i < question.answers.length; i++) {
        if (question.answers[i].state === 'clicked') {
          clicked = true;
          break;
        }
      }
      return clicked;
    };

    if (!hasAtLeastOneClicked(thisQuestion)) {
      this.setMessage(`At least select 1 answer`);
      return false;
    }
    return true;

	}

	private getData(): void {
		this.questionService.getAll().subscribe({
      complete: () => {},
      error: () => {
        alert('something was wrong');
      },
      next: (res: any) => {
        this.questionSheet = res;
        this.setCurrentQuestion();
      }
		});
	}

  setCurrentQuestion(): void {
    if (this.currentIndex < this.questionSheet.length) {
      this.currentQuestion = this.questionSheet[this.currentIndex];
    } else if (this.currentIndex === this.questionSheet.length) {
      this.finishGame();
    }
  }

  finishGame() {
    this.isGameFinished = true;
    this.resetVariables();
  }

  resetVariables() {
    this.currentIndex = 0;
    this.achievedScore = 0;
  }

  private async getCorrectAnswer(questionId: number) {
    const response: Answer = await this.questionService.getCorrectAnswer(questionId);
    const thisQuestion = this.questionSheet.find(question => question.id === questionId);
    const answers = thisQuestion.answers;
    const correctAnswersId = response.correctAnswersId;

    for (let i = 0; i < answers.length; i++) {
      if (correctAnswersId.includes(answers[i].id)) {
        answers[i].serverState = 'correct';
        if (answers[i].state === 'clicked') {
          this.achievedScore += thisQuestion.score / correctAnswersId.length;
        }
      } else {
        if (answers[i].state === 'clicked') {
          if (this.currentIndex !== 0) {
            this.achievedScore = this.achievedScore - (this.achievedScore / this.currentIndex);
          }
        }
        answers[i].serverState = 'inCorrect';
      }
    }
  }

	private setMessage(message: string): void {
		this.message = message;
	}

	private clearMessage(): void {
		this.message = null;
	}

  public startGame(): void {
    this.isGameStarted = true;
    this.isGameFinished = false;
  }

  public startGameAgain(): void {
    this.getData();
    this.isGameStarted = true;
    this.isGameFinished = false;
  }

  seconds = 3;
  timer: number;
  private startTimer(): void {
    this.timer = this.seconds;
    const timerInterval = setInterval(() => {
      if (this.timer > 0) {
        this.timer -= 1;
      } else {
        clearInterval(timerInterval);
      }
    }, 1000);
  }

  getTimeRemainingPercent(): string {
    return `width: ${(this.seconds - this.timer) * 34}%`;
  }

}
