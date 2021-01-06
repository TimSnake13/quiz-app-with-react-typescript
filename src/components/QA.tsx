import React from "react";
import Question from "./Question";
import { useFetch } from "./useFetch";

const QA = () => {
  const url = "https://quizapi.io/api/v1/questions";

  const { data, loading } = useFetch({ url: url });

  const [idx, setIdx] = React.useState(0);

  const nextQuestion = () => {
    setIdx((prev) => prev + 1);
    console.log("Added");
  };

  return (
    <div>
      <div>
        {!data ? (
          <p>Loading.....</p>
        ) : (
          <div>
            Loaded:
            <div className="flex-center">
              <Question singleData={data[idx]} nextQuestion={nextQuestion} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QA;
