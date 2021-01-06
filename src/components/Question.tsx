import React, { useRef, useEffect, useState } from "react";

interface Props {
  singleData: any;
}

const Question = (props: Props) => {
  const tableRef = useRef<HTMLTableElement>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  let currentSelection: { [key: string]: boolean } = {}; // index signature

  // Uncheck other options if it doesn't have multiple correct answers
  useEffect(() => {
    const data = props.singleData;
    if (data.multiple_correct_answers === false)
      if (tableRef && tableRef.current) {
        var answers: any = tableRef.current.getElementsByTagName("input");
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
  }, [props.singleData]);
  // TODO: Add a submit button, then compare the answer(change the color of the element?)

  function handleSelection(name: string) {
    if (tableRef && tableRef.current) {
      const el = tableRef.current.getElementsByClassName(
        name
      )[0] as HTMLInputElement;
      el.click();
    }
  }

  function checkAnswers() {
    const data = props.singleData;
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

      console.log(correct);
      console.log(typeof correct[0]);

      // Start compare:
      let j = 0;
      Object.keys(data.answers).map((key) => {
        if (currentSelection[key]) {
          if (currentSelection[key] !== correct[j]) {
            // TODO: consider use data.multiple_correct_answers: false (is a string) ?
            console.log("CS: " + currentSelection[key]);
            console.log("C[" + j + "]: " + correct[j]);
            console.log("Incorrect Answer Index: " + j);
            console.log(data);
            setShowExplanation(true);
          }
          j++;
        }
        return null;
      });
    }
  }

  return (
    <>
      {!props.singleData ? (
        <></>
      ) : (
        <div>
          <h3>{props.singleData.question}</h3>
          <table ref={tableRef}>
            <tbody>
              {Object.keys(props.singleData.answers).map(
                (key) =>
                  props.singleData.answers[key] && (
                    <tr key={props.singleData.answers[key]}>
                      <td>
                        <div className="answer">
                          <input
                            type="checkbox"
                            value={key}
                            className={"input-" + props.singleData.answers[key]}
                            onChange={() => {
                              // Update stored answers
                              currentSelection[key] = !currentSelection[key];
                            }}
                            checked={currentSelection[key]}
                          />
                          <label className="answer-text">
                            {props.singleData.answers[key]}
                          </label>
                          <div
                            className="answer-clickable"
                            onClick={() =>
                              handleSelection(
                                "input-" + props.singleData.answers[key]
                              )
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
                {props.singleData.explanation ? (
                  <p>{props.singleData.explanation}</p>
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
            <button onClick={checkAnswers}>Submit</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Question;
