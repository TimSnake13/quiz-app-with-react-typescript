import React from "react";
import Question from "./Question";
import { useFetch } from "./useFetch";

const QA = () => {
  const url = "https://quizapi.io/api/v1/questions";

  const { data, loading } = useFetch({ url: url });

  return (
    <div>
      {!data ? (
        <p>Loading.....</p>
      ) : (
        <div>
          Loaded:
          <div>
            <Question singleData={data[0]} />
          </div>
        </div>
      )}
    </div>
  );
};

export default QA;
