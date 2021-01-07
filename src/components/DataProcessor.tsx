export class QuizapiDataProcessor {
  data: any;
  currentQuestionIdx: number;

  allQuestions: string[];

  constructor(data: any) {
    this.data = data;
    this.currentQuestionIdx = 0;
    this.allQuestions = [];

    for (var i = 0; i < data.length; i++) {
      this.allQuestions[i] = data[i].question;
    }
  }

  nextQuestion() {
    return this.allQuestions[this.currentQuestionIdx];
  }
}
