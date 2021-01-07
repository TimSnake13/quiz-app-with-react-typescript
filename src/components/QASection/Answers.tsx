import React from "react";
import Answer from "./Answer";

interface Props {
  answers: string[];
}

const Answers = ({ answers }: Props) => {
  const renderAnswers = [];
  if (answers) {
    for (var idx = 0; idx < answers.length; idx++) {
      renderAnswers.push(<Answer text={answers[idx]} clickable={true} />);
    }
  }

  return (
    <table>
      <tbody>{renderAnswers}</tbody>
    </table>
  );
};

export default Answers;
