class DataProcessor {
  data: any;
  currentQuestionIdx: number;
  isLoaded: boolean;
  allQuestions: string[];
  allAnswers: string[][];
  allCorrectAnswers: number[][];
  allExplanations: string[];

  constructor(data: any) {
    this.data = data;
    this.currentQuestionIdx = 0;
    this.isLoaded = false;
    this.allQuestions = [];
    this.allAnswers = [];
    this.allCorrectAnswers = [];
    this.allExplanations = [];
  }

  /** Return a string which is the current question */
  currentQuestion() {
    return this.allQuestions[this.currentQuestionIdx];
  }

  /** Return a Array<string> which contains the current answers */
  currentAnswers() {
    return this.allAnswers[this.currentQuestionIdx];
  }
  /** Return a sorted Array<number> which contains the current correct answers' indexes.
   * Remember to use currentCorrectAnswers().length > 1 to see if it has multiple correct answers
   * Example: [0, 3] meaning the correct answers are the first and the forth answer  */
  currentCorrectAnswers() {
    return this.allCorrectAnswers[this.currentQuestionIdx];
  }

  currentExplanation() {
    return this.allExplanations[this.currentQuestionIdx];
  }
  /** currentQuestionIdx++ */
  IdxIncrement() {
    return this.currentQuestionIdx++;
  }

  IdxDecrement() {
    if (this.currentQuestionIdx - 1 > 0) return this.currentQuestionIdx--;
    return 0;
  }

  Log() {
    console.log(this.data);
    console.log(this);
    console.log(this.currentQuestionIdx);
    console.log(this.allAnswers);
    console.log(this.allAnswers[this.currentQuestionIdx]);
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
      this.isLoaded = true;

      for (var i = 0; i < data.length; i++) {
        this.allQuestions[i] = data[i].question;
        this.allAnswers[i] = ObjValueToArray(data[i].answers);

        var arr = ObjValueToArray(data[i].correct_answers);
        var output: number[] = [];
        for (let j = 0; j < arr.length; j++) {
          if (arr[j] === "true") {
            output.push(j);
          }
        }
        if (!output) console.error("No correct answer in this question!");
        this.allCorrectAnswers[i] = output;

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
    super(data);
    if (data) {
      this.isLoaded = true;

      for (var i = 0; i < data.length; i++) {
        this.allQuestions[i] = data[i].question;

        // TODO: if data[i].correct_answer is array? Impossible?
        // Randomized the array order because of the object structure
        var arr = ObjValueToArray(data[i].correct_answer).concat(
          ObjValueToArray(data[i].incorrect_answers)
        );
        var correctAnswerIdx = getRandomInt(0, arr.length);
        this.allAnswers[i] = array_move(arr, 0, correctAnswerIdx);
        this.allCorrectAnswers[i] = [correctAnswerIdx];

        data[i].explanation =
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";
      }
    }
  }
}

function ObjValueToArray(obj: any) {
  var arr: string[] = [];
  var items: [string, string][] = Object.entries(obj);
  for (var j = 0; j < items.length; j++) {
    if (items[j][1]) {
      arr[j] = items[j][1];
    }
  }
  return arr;
}

// Written By Reid. From: https://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
// Usage:
// console.log(array_move([1, 2, 3], 0, 1));
// => returns[2, 1, 3]
function array_move(arr: any[], old_index: number, new_index: number) {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr; // for testing
}

//The maximum is exclusive and the minimum is inclusive
function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
