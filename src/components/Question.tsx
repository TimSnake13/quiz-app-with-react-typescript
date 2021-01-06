import React, { useRef, useEffect, useState } from "react";
import Answer from "./Answer";
import { FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";

interface Props {
  singleData: any;
  nextQuestion: () => void;
}

const Question = (props: Props) => {
  const data = props.singleData;
  const tableRef = useRef<HTMLTableElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // const correct: boolean[] = [];
  const correct = React.useMemo(() => {
    const c: boolean[] = [];
    if (data.correct_answers) {
      var k = 0;
      Object.keys(data.correct_answers).map((key) => {
        if (data.correct_answers[key] === "true") {
          c[k] = true;
        } else {
          c[k] = false;
        }
        k++;
        return null;
      });
    }
    return c;
  }, [data.correct_answers]);

  const currentSelection: { [key: string]: boolean } = {}; // index signature
  // currentSelection init:
  if (data.answers) {
    Object.keys(data.answers).map((key) => {
      if (data.answers[key]) {
        currentSelection[key] = false;
      }
      return null;
    });
  }

  useEffect(() => {
    // Uncheck other options if it doesn't have multiple correct answers
    if (data.multiple_correct_answers === "false")
      if (tableRef && tableRef.current) {
        var answers = tableRef.current.getElementsByTagName("input");
        for (var i = 0; i < answers.length; i++) {
          const currentEl = answers[i];
          currentEl.onclick = () => {
            for (var j = 0; j < answers.length; j++) {
              if (answers[j] !== currentEl && currentEl.checked) {
                answers[j].checked = false;
                currentSelection[Object.keys(currentSelection)[j]] = false;
              }
            }
          };
        }
      }

    // if new question:
    setIsSubmitted(false);
  }, [data]);

  function handleSelection(name: string) {
    if (tableRef && tableRef.current) {
      const el = tableRef.current.getElementsByClassName(
        name
      )[0] as HTMLInputElement;
      el.click();
    }
  }

  function toggleCurrentSelection(key: string) {
    if (currentSelection[key] === true || currentSelection[key] === false) {
      currentSelection[key] = !currentSelection[key];
    } else {
      console.error("currentSelection key: " + key + " doesn't exist!");
      console.error("Current selected:");
      console.error(currentSelection);
    }
  }

  function submitAnswers() {
    // e.preventDefault();
    if (correct) {
      // Start compare:
      let j = 0;
      Object.keys(data.answers).map((key) => {
        const div = tableRef?.current?.getElementsByClassName(
          "answer " + data.answers[key]
        )[0] as HTMLDivElement;

        // An Answer can have 4 states:
        // 1. user selected, and it's "true"                               => style green
        // 2. user selected, and it's "false"                              => style red
        // 3. user didn't select, and it's "true" (need to selected)       => style green
        // 4. user didn't select, and it's "false"                         => style default

        if (currentSelection[key] === true) {
          if (correct[j] === true) {
            StyleCorrect(div);
            // console.log("State 1");
          } else if (correct[j] === false) {
            StyleIncorrect(div);
            // console.log("State 2");
          }
        } else if (currentSelection[key] === false) {
          if (correct[j] === true) {
            StyleCorrect(div);
            // console.log("State 3");
          } else if (correct[j] === false) {
            // console.log("State 4");
            StyleDefault(div);
          }
        }

        j++;

        return null;
      });
    }
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
          <h3>{data.question}</h3>
          <table ref={tableRef}>
            <tbody>
              {Object.keys(data.answers).map(
                (key) =>
                  data.answers[key] && (
                    <tr key={data.answers[key]}>
                      <td>
                        <div className={"answer " + data.answers[key]}>
                          <Answer
                            answer_key={key}
                            answer={data.answers[key]}
                            currentSelection={currentSelection}
                            toggleCurrentSelection={toggleCurrentSelection}
                            handleSelection={handleSelection}
                            clickable={!isSubmitted}
                          />
                        </div>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
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
                <button onClick={props.nextQuestion}>Next Question</button>
              </div>
            )}
          </div>
          <div>
            {isSubmitted && (
              // This api have mostly none explanation
              <div>
                <h4>Explanation: </h4>
                {data.explanation ? (
                  <p>{data.explanation}</p>
                ) : (
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Question;
