import React, { useRef, useEffect } from "react";

interface Props {
  singleData: any;
}

const Question = (props: Props) => {
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    if (tableRef && tableRef.current) {
      var answers: any = tableRef.current.getElementsByTagName("input");
      for (var i = 0; i < answers.length; i++) {
        // eslint-disable-next-line no-loop-func
        const current = answers[i];
        current.onclick = () => {
          for (var j = 0; j < answers.length; j++) {
            if (answers[j] !== current && current.checked) {
              answers[j].checked = false;
            }
          }
        };
      }

      // Add some styles
    }
  }, [props.singleData]);

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
              {Object.keys(props.singleData.answers).map(
                (key) =>
                  props.singleData.answers[key] && (
                    <tr key={props.singleData.answers[key]}>
                      <td
                        onClick={() =>
                          handleSelection(
                            "input-" + props.singleData.answers[key]
                          )
                        }
                      >
                        {" "}
                        <div className="answer">
                          <input
                            type="radio"
                            value={key}
                            className={"input-" + props.singleData.answers[key]}
                          />
                          <label className="answer-text">
                            {props.singleData.answers[key]}
                          </label>{" "}
                        </div>
                      </td>
                    </tr>
                  )
              )}
            </table>
          </form>
        </div>
      )}
    </>
  );
};

export default Question;
