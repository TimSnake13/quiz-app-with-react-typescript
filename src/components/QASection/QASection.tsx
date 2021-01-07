import React, { useEffect, useState } from "react";
import Question from "./Question";
import { useFetch } from "../useFetch";
import { QuizAPIDataProcessor } from "../DataProcessor";
import Answers from "./Answers";

const QASection = () => {
  const { fetchData, loading } = useFetch({
    url: "https://quizapi.io/api/v1/questions",
    // TODO: Change props to header object
    apiKeyName: "X-Api-Key",
    apiKeyValue: "XGwhNMAwuBENu2HVuG8kEkbAa4P9ZCwBMlB8vy55",
  });

  const [data, setData] = useState<QuizAPIDataProcessor>(
    new QuizAPIDataProcessor({})
  );
  useEffect(() => {
    if (data && data.currentQuestionIdx >= 18) {
      // TODO: Start fetching next sets of question
    }
  }, [data]);
  useEffect(() => {
    if (fetchData) {
      const d = new QuizAPIDataProcessor(fetchData);
      setData(d);
    }
  }, [fetchData]);

  const [{ currentSelectedAnswers }, setCurrentSelectedAnswers] = useState({
    currentSelectedAnswers: [],
  });

  return (
    <div>
      <div>
        {loading ? (
          <p>Loading.....</p>
        ) : (
          <div>
            Loaded:
            <div className="flex-center">
              <div className="min-height flex-center column">
                <Question text={data.currentQuestion()} />
                <Answers answers={data.currentAnswers()} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QASection;
