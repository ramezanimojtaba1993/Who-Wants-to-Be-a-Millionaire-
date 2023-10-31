import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GameService } from './game.service';
import { Answer, GameStates, QuestionSheet } from 'src/app/model/question.model';
import { StorageService } from 'src/app/services/storage.service';

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
  hasGameUnFinished = false;

  questionSheet: QuestionSheet[] = [];

	currentQuestion: QuestionSheet;
  currentIndex: number = 0;
	message: string;
  achievedScore = 0;

  constructor(private gameService: GameService, private storageService: StorageService) {}

  ngOnInit() {
    this.getGameState();
  }

  async getGameState() {
    const { userId } = this.storageService.getItem('userinfo');
    const response: GameStates = await this.gameService.getGameState(userId);

    if (response) {
      this.questionSheet = response.questionSheet;
      this.currentIndex = response.currentQuestionId;
      this.hasGameUnFinished = true;
    } else {
      this.initializeGame();
    }

  }

	async next() {
		if (this.isAllowedToNext()) {
      // این مدت پایینیا رو دگه کال نکن باگ خیز میشه چون خود شیت دیزییبل و کلیک و اینا رو داره باس
      // تشخیض بدی اگه کش بو اینا کال نشه
      this.currentQuestion.loading = true;
      await this.calcAchievedScore(this.currentQuestion.id);
      this.currentQuestion.loading = false;
      this.disabledAllAnswers(this.currentQuestion.id);

      const goNext = async () => {
        this.carousel.next();
        this.currentIndex++;
        await this.updateGameStates();
        await this.setCurrentQuestion();
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

  private async initializeGame() {
    const questionSheet = await this.gameService.getQuestionsSheet();
    if (questionSheet) {
      this.questionSheet = questionSheet;
    }

    this.setCurrentQuestion();

    const { userId } = this.storageService.getItem('userinfo');
    const body: GameStates = {
      id: userId,
      userId,
      currentQuestionId: this.currentQuestion.id,
      questionSheet: questionSheet
    }

    await this.gameService.createGameStates(body);
  }

  async setCurrentQuestion() {
    if (this.currentIndex < this.questionSheet.length) {
      this.currentQuestion = this.questionSheet[this.currentIndex];
    } else if (this.currentIndex === this.questionSheet.length) {
      this.finishGame();
    }
  }

  async updateGameStates() {
    const { userId } = this.storageService.getItem('userinfo');
    const body: GameStates = {
      id: userId,
      userId,
      currentQuestionId: this.currentQuestion.id,
      questionSheet: this.questionSheet
    }
    await this.gameService.updateGameStates(userId, body);
  }

  finishGame() {
    this.isGameFinished = true;
    this.resetVariables();
  }

  resetVariables() {
    this.currentIndex = 0;
    this.achievedScore = 0;
  }

  private async calcAchievedScore(questionId: number) {
    const response: Answer = await this.gameService.getCorrectAnswer(questionId);
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
    // this.isGameFinished = false;
  }

  public continueGame(): void {
    this.isGameStarted = true;
    this.isGameFinished = false;
    this.currentQuestion = this.questionSheet[this.currentIndex];

    setTimeout(() => {
      this.carousel.to(this.currentIndex);
    });

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
