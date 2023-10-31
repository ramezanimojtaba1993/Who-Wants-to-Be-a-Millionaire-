export interface AnswerItem {
  id: number;
  title: string;
  state: 'clicked' | 'unClicked';
  serverState: 'correct' | 'inCorrect';
  disabled: boolean;
}

export interface Answer {
  questionId: number;
  correctAnswersId: number[];
}

export interface QuestionSheet {
  id: number;
  questionTitle: string;
  answers: AnswerItem[];
  score: number;
  loading: boolean;
  isSeen: boolean;
}
