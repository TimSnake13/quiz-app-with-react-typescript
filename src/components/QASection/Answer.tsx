import React from "react";
import styled from "styled-components";
import { GrCheckboxSelected, GrCheckbox } from "react-icons/gr";

interface Props {
  text: string;
  clickable: boolean;
}

const Answer = ({ text, clickable }: Props) => {
  const [clicked, setClicked] = React.useState(false);
  return (
    <AnswerContainer clicked={clicked}>
      {clicked ? <GrCheckboxSelected /> : <GrCheckbox />}
      <TextLabel className="answer-text">{text}</TextLabel>
      <ClickableDiv
        clickable={clickable}
        onClick={() => setClicked((currClicked) => !currClicked)}
      ></ClickableDiv>
    </AnswerContainer>
  );
};

export default Answer;

const ClickableDiv = styled.div<{ clickable: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  cursor: ${(props) => (props.clickable ? "pointer" : "none")};
`;

const AnswerContainer = styled.div<{ clicked: boolean }>`
  background-color: ${(props) => (props.clicked ? "#C7D2FE" : "#E0E7FF")};
  border-radius: 4px;
  padding: 10px 20px;
  margin-bottom: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  transition: background-color 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955);
  min-width: 300px;
`;

const TextLabel = styled.label<{}>`
  margin-left: 10px;
  max-width: 300px;
`;
