import React, { useEffect, useState } from "react";
import { useFetch } from "../useFetch";
import { QuizAPIDataProcessor } from "../DataProcessor";
import QASection from "./QASection";
import PrintJson from "./PrintJson";
import { DataContext } from "./data-context";

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
  const [currIdx, setCurrIdx] = useState(0);

  useEffect(() => {
    if (data && data.currentQuestionIdx >= 18) {
      // TODO: Start fetching next sets of question
    }
  }, [data, data.currentQuestionIdx]);

  useEffect(() => {
    if (fetchData) {
      const d = new QuizAPIDataProcessor(fetchData);
      setData(d);
    }
  }, [fetchData]);

  const [currentSelectedAnswersIdx, setCurrentSelectedAnswersIdx] = useState<
    Array<number>
  >([]); // Save the selected answer's index number

  // useEffect(() => {
  //   console.log("New Selections idx: ");
  //   console.log(currentSelectedAnswersIdx);
  //   console.log("Current Correct Answers:");
  //   console.log(data.currentCorrectAnswers());
  // }, [currentSelectedAnswersIdx]);

  function toggleSelection(idx: number) {
    setCurrentSelectedAnswersIdx((prevSelections) => {
      const arr: number[] = prevSelections;
      if (containsNum(arr, idx)) {
        // remove it
        return arr.filter((el) => el !== idx);
      } else {
        return [...prevSelections, idx];
      }
    });
  }

  function containsNum(a: number[], obj: number) {
    var i = a.length;
    while (i--) {
      if (a[i] === obj) {
        return true;
      }
    }
    return false;
  }

  function submitAnswer() {
    // Sort current selected answers
    setCurrentSelectedAnswersIdx((currArr) => currArr.sort(sortEggsInNest)); // Will not trigger useEffect
    let pass = true;
    const correctAnswers = data.currentCorrectAnswers();

    if (currentSelectedAnswersIdx.length === 0) {
      console.log("❌Failed!");
      return null;
    }

    for (let i = 0; i < currentSelectedAnswersIdx.length; i++) {
      if (
        correctAnswers[i] !== currentSelectedAnswersIdx[i] ||
        !correctAnswers[i]
      ) {
        pass = false;
        console.log("❌Failed!");
        return null;
      }
    }

    console.log("💯Success!");
  }
  function sortEggsInNest(a: number, b: number) {
    return a > b ? 1 : b > a ? -1 : 0;
  }

  function prevQuestion() {
    setCurrIdx(data.IdxDecrement());
    resetSelection();
  }
  function nextQuestion() {
    setCurrIdx(data.IdxIncrement());
    resetSelection();
  }
  function resetSelection() {
    setCurrentSelectedAnswersIdx([]);
  }

  return (
    <div>
      <div>
        {loading ? (
          <div>Loading.....</div>
        ) : (
          <div>
            Loaded:
            <PrintJson data={data} />
            <DataContext.Provider
              value={{
                toggleSelection: toggleSelection,
                submitAnswer: submitAnswer,
                prev: prevQuestion,
                next: nextQuestion,
              }}
            >
              <QASection data={data} currIdx={currIdx} />
            </DataContext.Provider>
          </div>
        )}
      </div>
    </div>
  );
};

export default QASectionContainer;
