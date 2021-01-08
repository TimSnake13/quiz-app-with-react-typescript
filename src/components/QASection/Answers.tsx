import React from "react";
import Answer from "./Answer";

interface Props {
  answers: string[];
}

const Answers = ({ answers }: Props) => {
  return (
    <>
      {answers &&
        answers.map((answer) => (
          <Answer key={answer} text={answer} clickable={true} />
        ))}
    </>
  );
};

export default Answers;
