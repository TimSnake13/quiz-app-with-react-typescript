import React, { useEffect } from "react";
import Question from "./Question";
import { useFetch } from "./useFetch";
import { QuizapiDataProcessor } from "./DataProcessor";

const QA = () => {
  const { data, loading } = useFetch({
    url: "https://quizapi.io/api/v1/questions",
    apiKeyName: "X-Api-Key",
    apiKeyValue: "XGwhNMAwuBENu2HVuG8kEkbAa4P9ZCwBMlB8vy55",
  });

  useEffect(() => {
    if (data) {
      const d = new QuizapiDataProcessor(data);
    }
  }, [data]);

  const [idx, setIdx] = React.useState(0);

  const nextQuestion = () => {
    setIdx((prev) => prev + 1);
    console.log("Added");
  };

  return (
    <div>
      <div>
        {loading ? (
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
