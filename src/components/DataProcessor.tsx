// Quiz api fetch data example:
// [
//   {
//     id: 1,
//     question: "How to delete a directory in Linux?",
//     description: "delete folder",
//     answers: {
//       answer_a: "ls",
//       answer_b: "delete",
//       answer_c: "remove",
//       answer_d: "rmdir",
//       answer_e: null,
//       answer_f: null,
//     },
//     multiple_correct_answers: "false",
//     correct_answers: {
//       answer_a_correct: "false",
//       answer_b_correct: "false",
//       answer_c_correct: "false",
//       answer_d_correct: "true",
//       answer_e_correct: "false",
//       answer_f_correct: "false",
//     },
//     explanation: "rmdir deletes an empty directory",
//     tip: null,
//     tags: [],
//     category: "linux",
//     difficulty: "Easy",
//   },
// ];
export class QuizapiDataProcessor {
  data: any;
  currentQuestionIdx: number;

  allQuestions: string[];
  allAnswers: string[][];

  constructor(data: any) {
    this.data = data;
    this.currentQuestionIdx = 0;
    this.allQuestions = [];
    this.allAnswers = [[]];
    if (data) {
      for (var i = 0; i < data.length; i++) {
        this.allQuestions[i] = data[i].question;

        var d_answers: [string, string][] = [];
        d_answers = Object.entries(data[i].answers);

        var arr: string[] = [];
        for (var j = 0; j < d_answers.length; j++) {
          if (d_answers[j][1]) {
            arr[j] = d_answers[j][1];
          }
        }
        this.allAnswers[i] = arr;
      }
    }
  }

  nextQuestion() {
    return this.allQuestions[this.currentQuestionIdx];
  }
}
