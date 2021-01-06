import React, { useRef, useEffect, useState } from "react";

interface Props {
  singleData: any;
}

const Question = (props: Props) => {
  const data = props.singleData;
  const tableRef = useRef<HTMLTableElement>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  let currentSelection: { [key: string]: boolean } = {}; // index signature

  // Uncheck other options if it doesn't have multiple correct answers
  useEffect(() => {
    if (data.multiple_correct_answers === "false")
      if (tableRef && tableRef.current) {
        var answers = tableRef.current.getElementsByTagName("input");
        for (var i = 0; i < answers.length; i++) {
          const current = answers[i];
          current.onclick = () => {
            for (var j = 0; j < answers.length; j++) {
              if (answers[j] !== current && current.checked) {
                answers[j].checked = false;
              }
            }
          };
        }
      }
    // After Loaded:
    // Save all the current answers selection
    if (data.answers) {
      Object.keys(data.answers).map((key) => {
        if (data.answers[key]) {
          currentSelection[key] = false;
        }
        return null;
      });
    }
  }, [data]);

  function handleSelection(name: string) {
    if (tableRef && tableRef.current) {
      const el = tableRef.current.getElementsByClassName(
        name
      )[0] as HTMLInputElement;
      el.click();
    }
  }

  function submitAnswers() {
    const correct: boolean[] = [];
    let i = 0;
    if (data.correct_answers) {
      Object.keys(data.correct_answers).map((key) => {
        if (data.correct_answers[key] === "true") {
          correct[i] = true;
        } else {
          correct[i] = false;
        }
        i++;
        return null;
      });

      // Start compare:
      let j = 0;
      Object.keys(data.answers).map((key) => {
        if (currentSelection[key]) {
          const div = tableRef?.current?.getElementsByClassName(
            "answer " + data.answers[key]
          )[0] as HTMLDivElement;

          // An Answer can have 4 states:
          // 1. user selected, and it's "true"                               => style green
          // 2. user selected, and it's "false"                              => style red
          // 3. user didn't select, and it's "true" (need to selected)       => style red
          // 3. user didn't select, and it's "false" (need to selected)      => style default

          if (currentSelection[key] === true) {
            if (correct[j] === true) {
              StyleCorrect(div);
            } else if (correct[j] === false) {
              StyleIncorrect(div);
              setShowExplanation(true);
            }
          } else if (currentSelection[key] === false) {
            if (correct[j] === true) {
              StyleIncorrect(div);
              setShowExplanation(true);
            } else if (correct[j] === false) {
              // Do nothing
            }
          }

          j++;
        }
        return null;
      });
    }
  }

  function StyleCorrect(el: HTMLDivElement) {
    if (el) el.style.backgroundColor = "green";
  }
  function StyleIncorrect(el: HTMLDivElement) {
    if (el) el.style.backgroundColor = "red";
  }

  return (
    <>
      {data && (
        <div>
          <h3>{data.question}</h3>
          <table ref={tableRef}>
            <tbody>
              {Object.keys(data.answers).map(
                (key) =>
                  data.answers[key] && (
                    <tr key={data.answers[key]}>
                      <td>
                        <div className={"answer " + data.answers[key]}>
                          <input
                            type="checkbox"
                            value={key}
                            className={"input-" + data.answers[key]}
                            onChange={() => {
                              // Update stored answers
                              currentSelection[key] = !currentSelection[key];
                            }}
                            checked={currentSelection[key]}
                          />
                          <label className="answer-text">
                            {data.answers[key]}
                          </label>
                          <div
                            className="answer-clickable"
                            onClick={() =>
                              handleSelection("input-" + data.answers[key])
                            }
                          ></div>
                        </div>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
          <div>
            {showExplanation && (
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
            <button onClick={submitAnswers}>Submit</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Question;
