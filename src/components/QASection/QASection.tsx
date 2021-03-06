import React from "react";
import styled from "styled-components";
import Question from "./Question";
import Answers from "./Answers";
import SubmitAndNextSection from "./SubmitAndNextSection";

const QASection = ({ data, currIdx }: any) => {
  return (
    <>
      <FlexCenter>
        <SectionContainer>
          <Question text={data.currentQuestion()} />
          <Answers answers={data.currentAnswers()} />
          {/* <Answers answers={data.getQuestion(currIdx)} /> */}
          <SubmitAndNextSection />
        </SectionContainer>
      </FlexCenter>
    </>
  );
};

export default QASection;

const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SectionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-direction: column;
  min-height: 80vh;
  max-width: 60vw;
`;
