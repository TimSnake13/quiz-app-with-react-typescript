import React from "react";

interface Props {
  answer_key: string;
  answer: string;
  currentSelection: any;
  toggleCurrentSelection: (key: string) => void;
  handleSelection: (name: string) => void;
  clickable: boolean;
}

const Answer = (props: Props) => {
  const cursorPointer = {
    cursor: "pointer",
  };

  return (
    <>
      <input
        type="checkbox"
        value={props.answer_key}
        className={"input-" + props.answer} // Use for handleSelection Search
        onChange={() => {
          // Update stored answers
          //   props.currentSelection[props.answer_key] = !props.currentSelection[
          //     props.answer_key
          //   ];
          props.toggleCurrentSelection(props.answer_key);
        }}
        checked={props.currentSelection[props.answer_key]}
      />
      <label className="answer-text">{props.answer}</label>
      <div
        className="answer-clickable"
        style={props.clickable ? cursorPointer : undefined}
        onClick={() =>
          props.clickable
            ? props.handleSelection("input-" + props.answer)
            : null
        }
      ></div>
    </>
  );
};

export default Answer;
