import React, { useRef, useEffect } from "react";

interface Props {
  singleData: any;
}

const Question = (props: Props) => {
  const tableRef = useRef<HTMLTableElement>(null);

  const currentSelection: boolean[] = [];
  let answerIdx = 0; // To assign & keep track of answers value

  // Uncheck other options if it doesn't have multiple correct answers
  useEffect(() => {
    if (props.singleData.multiple_correct_answers === false)
      if (tableRef && tableRef.current) {
        answerIdx = 0; // reset index
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
    if (props.singleData.answers) {
      let counter = 0;
      Object.keys(props.singleData.answers).map((key) => {
        if (props.singleData.answers[key]) {
          currentSelection[counter] = false; // Init
          counter++;
        }
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

  return (
    <>
      {!props.singleData ? (
        <></>
      ) : (
        <div>
          <h3>{props.singleData.question}</h3>
          <form>
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
                              className={
                                "input-" + props.singleData.answers[key]
                              }
                              onChange={() => console.log(currentSelection)}
                              checked={currentSelection[answerIdx]}
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
          </form>
        </div>
      )}
    </>
  );
};

export default Question;
