import React, { useRef, useEffect, useState, useMemo } from "react";
import Answer from "./Answer_old";
import { QuizAPIDataProcessor, TriviaAPIDataProcessor } from "../DataProcessor";
import { FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";

interface Props {
  data: TriviaAPIDataProcessor | QuizAPIDataProcessor;
  nextQuestion: () => void;
}

const Question = ({ data, nextQuestion }: Props) => {
  const tableRef = useRef<HTMLTableElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [canToggleOther, setCanToggleOther] = useState(false);

  const [currentSelection, setCurrentSelection] = useState<Array<boolean>>([]);

  useEffect(() => {
    // If Idx changes, update all the data
    if (
      data.isLoaded &&
      data.currentAnswers() &&
      data.currentCorrectAnswers()
    ) {
      // CurrentSelection Init
      var arr: boolean[] = [];
      for (var idx = 0; idx < data.currentAnswers().length; idx++) {
        arr[idx] = false;
      }
      setCurrentSelection(arr);

      // Uncheck other options if it doesn't have multiple correct answers
      if (data.currentCorrectAnswers().length === 1) {
        setCanToggleOther(true);
        // if (tableRef && tableRef.current) {
        //   var answers = tableRef.current.getElementsByTagName("input");
        //   for (var i = 0; i < answers.length; i++) {
        //     const currentEl = answers[i];
        //     currentEl.onclick = () => {
        //       for (var j = 0; j < answers.length; j++) {
        //         if (answers[j] !== currentEl && currentEl.checked) {
        //           //FIXME: how to implement single selection?
        //           answers[j].checked = false;
        //           currentSelection[j] = false;
        //         }
        //       }
        //     };
        //   }
      } else {
        setCanToggleOther(false);
        console.error("Multiple correct answers!");
      }
    }

    setIsSubmitted(false);
  }, [data.currentQuestionIdx]);

  const renderAnswers: any[] = [];
  if (data.currentAnswers()) {
    const ca = data.currentAnswers();
    for (let idx = 0; idx < ca.length; idx++) {
      renderAnswers.push(
        <tr key={ca[idx]}>
          <td>
            {/* <div className={"answer " + data.currentAnswers()[idx]}> */}
            <div className="answer">
              <Answer
                answer_idx={idx}
                answer_text={ca[idx]}
                currentSelection={currentSelection}
                toggleCurrentSelection={toggleCurrentSelection}
                clickable={!isSubmitted}
                canToggleOtherOptionOff={canToggleOther}
              />
            </div>
          </td>
        </tr>
      );
    }
  }

  function handleSelection(name: string) {
    if (tableRef && tableRef.current) {
      const el = tableRef.current.getElementsByClassName(
        name
      )[0] as HTMLInputElement;
      el.click();
    }
  }

  function toggleCurrentSelection(key: number) {
    // if (currentSelection[key] === true || currentSelection[key] === false) {
    //   currentSelection[key] = !currentSelection[key];
    // } else {
    //   console.error("currentSelection key: " + key + " doesn't exist!");
    //   console.error("Current selected:");
    //   console.error(currentSelection);
    // }
    currentSelection[key] = !currentSelection[key];
  }

  function submitAnswers() {
    // Start compare current selected answers with correct answers:

    var isUserWrong = false;
    // An Answer can have 4 states:
    // 1. user selected, and it's "true"                               => style green
    // 2. user selected, and it's "false"                              => style red
    // 3. user didn't select, and it's "true" (need to selected)       => style green
    // 4. user didn't select, and it's "false"                         => style default
    // for (let idx = 0; idx < data.currentAnswers.length; idx++) {
    //   const correctAnswer = data.currentCorrectAnswers[j];
    //   if (currentSelection[idx] === true) {
    //     if (correctAnswer === true) {
    //       StyleCorrect(div);
    //       // console.log("State 1");
    //     } else if (correct[j] === false) {
    //       StyleIncorrect(div);
    //       // console.log("State 2");
    //       isUserWrong = true;
    //     }
    //   } else if (currentSelection[idx] === false) {
    //     if (correct[j] === true) {
    //       StyleCorrect(div);
    //       // console.log("State 3");
    //       isUserWrong = true;
    //     } else if (correct[j] === false) {
    //       // console.log("State 4");
    //       StyleDefault(div);
    //     }
    //   }
    // }

    if (isUserWrong) console.log("User choose the answer wrong!");
    // });

    setIsSubmitted(true); // Trigger rerender
  }

  function StyleDefault(el: HTMLDivElement) {
    if (el) {
      el.style.backgroundColor = "#d6d3d1"; // Don't Forget to change the color in App.css
    }
  }

  function StyleCorrect(el: HTMLDivElement) {
    if (el) {
      el.style.backgroundColor = "green";
      //   el.parentElement?.appendChild(FaRegCheckCircle);
    }
  }

  function StyleIncorrect(el: HTMLDivElement) {
    if (el) {
      el.style.backgroundColor = "red";
    }
  }

  return (
    <>
      {data && (
        <div className="min-height flex-center column">
          <h3>{data.currentQuestion()}</h3>
          <table ref={tableRef}>
            <tbody>{renderAnswers}</tbody>
          </table>
          <div className="flex-center">
            {isSubmitted === false ? (
              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    submitAnswers();
                  }}
                >
                  Submit
                </button>
              </div>
            ) : (
              <div>
                <button onClick={nextQuestion}>Next Question</button>
              </div>
            )}
            <button onClick={() => data.Log()}>Log</button>
          </div>
          <div>
            {isSubmitted && (
              // This api have mostly none explanation
              <div>
                <h4>Explanation: </h4>
                <p>{data && data.currentExplanation()}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Question;
