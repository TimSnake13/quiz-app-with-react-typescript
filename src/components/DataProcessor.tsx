function ObjToArray(obj: any) {
  var arr: string[] = [];
  var items: [string, string][] = Object.entries(obj);
  for (var j = 0; j < items.length; j++) {
    if (items[j][1]) {
      arr[j] = items[j][1];
    }
  }
  return arr;
}

class DataProcessor {
  data: any;
  currentQuestionIdx: number;

  allQuestions: string[];
  allAnswers: string[][];
  allIsMultipleCorrectAnswers: boolean[];
  allCorrectAnswers: string[][];
  allExplanations: string[];

  constructor(data: any) {
    this.data = data;
    this.currentQuestionIdx = 0;
    this.allQuestions = [];
    this.allAnswers = [];
    this.allCorrectAnswers = [];
    this.allIsMultipleCorrectAnswers = [];
    this.allExplanations = [];
  }

  currentQuestion() {
    return this.allQuestions[this.currentQuestionIdx];
  }
  currentAnswers() {
    return this.allAnswers[this.currentQuestionIdx];
  }
  currentCorrectAnswers() {
    return this.allCorrectAnswers[this.currentQuestionIdx];
  }
  isMultipleCorrectAnswers() {
    return this.allIsMultipleCorrectAnswers[this.currentQuestionIdx];
  }
  currentExplanation() {
    return this.allExplanations[this.currentQuestionIdx];
  }

  IdxIncrement() {
    this.currentQuestionIdx++;
  }
}

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

export class QuizAPIDataProcessor extends DataProcessor {
  constructor(data: any) {
    super(data); // call DataProcessor.constructor
    if (data) {
      for (var i = 0; i < data.length; i++) {
        this.allQuestions[i] = data[i].question;
        this.allAnswers[i] = ObjToArray(data[i].answers);
        this.allCorrectAnswers[i] = ObjToArray(data[i].correct_answers);
        data[i].multiple_correct_answers === "true"
          ? (this.allIsMultipleCorrectAnswers[i] = true)
          : (this.allIsMultipleCorrectAnswers[i] = false);
        data[i].explanation
          ? (this.allExplanations[i] = data[i].explanation)
          : (this.allExplanations[i] =
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.");
      }
    }
  }
}

// Trivia API Example Response:
// {
//   "response_code": 0,
//   "results": [
//     {
//       "category": "Science: Computers",
//       "type": "multiple",
//       "difficulty": "hard",
//       "question": "The Harvard architecture for micro-controllers added which additional bus?",
//       "correct_answer": "Instruction",
//       "incorrect_answers": ["Address", "Data", "Control"]
//     },
//     {
//       "category": "Science: Computers",
//       "type": "multiple",
//       "difficulty": "medium",
//       "question": "On which computer hardware device is the BIOS chip located?",
//       "correct_answer": "Motherboard",
//       "incorrect_answers": [
//         "Hard Disk Drive",
//         "Central Processing Unit",
//         "Graphics Processing Unit"
//       ]
//     },
// .....

export class TriviaAPIDataProcessor extends DataProcessor {
  constructor(data: any) {
    super(data); // call DataProcessor.constructor
    if (data) {
      for (var i = 0; i < data.length; i++) {
        this.allQuestions[i] = data[i].question;
        this.allAnswers[i] = ObjToArray(data[i].correct_answer).concat(
          ObjToArray(data[i].incorrect_answers)
        );
        this.allCorrectAnswers[i] = ObjToArray(data[i].correct_answers);
        data[i].multiple_correct_answers === "multiple"
          ? (this.allIsMultipleCorrectAnswers[i] = true)
          : (this.allIsMultipleCorrectAnswers[i] = false);
        data[i].explanation =
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";
      }
    }
  }
}
