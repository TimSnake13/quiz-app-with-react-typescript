import React from "react";
import Answer from "./Answer";

interface Props {
  answers: string[];
}

const Answers = ({ answers }: Props) => {
  let count = 0;

  return (
    <>
      {answers &&
        answers.map((answer) => (
          <Answer key={answer} text={answer} clickable={true} idx={count++} />
        ))}
    </>
  );
};

export default Answers;
