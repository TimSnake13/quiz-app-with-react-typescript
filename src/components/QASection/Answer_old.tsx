import React from "react";

interface Props {
  answer_idx: number;
  answer_text: string;
  currentSelection: boolean[];
  toggleCurrentSelection: (idx: number) => void;
  clickable: boolean;
  canToggleOtherOptionOff: boolean;
}

const Answer = ({
  answer_idx,
  answer_text,
  currentSelection,
  toggleCurrentSelection,
  clickable,
  canToggleOtherOptionOff,
}: Props) => {
  const cursorPointer = {
    cursor: "pointer",
  };

  return (
    <>
      <input
        type="checkbox"
        value={answer_idx}
        className={"input-" + answer_text} // Use for handleSelection Search
        onChange={() => {
          // Update stored answers
          //   currentSelection[answer_key] = !currentSelection[
          //     answer_key
          //   ];
          // toggleCurrentSelection(answer_idx);
        }}
        checked={currentSelection[answer_idx]}
      />
      <label className="answer-text">{answer_text}</label>
      <div
        className="answer-clickable"
        style={clickable ? cursorPointer : undefined}
        onClick={() => {
          if (clickable) {
            currentSelection[answer_idx] = true;
            if (canToggleOtherOptionOff) {
              for (let i = 0; i < currentSelection.length; i++) {
                if (i !== answer_idx) currentSelection[i] = false;
              }
            }
          }
        }}
      ></div>
    </>
  );
};

export default Answer;
