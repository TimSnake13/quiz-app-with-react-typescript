import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useFetch } from "../useFetch";
import { QuizAPIDataProcessor } from "../DataProcessor";
import QASection from "./QASection";
import PrintJson from "./PrintJson";

const QASectionContainer = () => {
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
          <div>Loading.....</div>
        ) : (
          <div>
            Loaded:
            <PrintJson data={data} />
            <QASection data={data} />
          </div>
        )}
      </div>
    </div>
  );
};

export default QASectionContainer;
