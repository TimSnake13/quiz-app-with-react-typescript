import React from "react";
import styled from "styled-components";
import { GrCheckboxSelected, GrCheckbox } from "react-icons/gr";
import { FcCheckmark, FcCancel } from "react-icons/fc";
import { DataContext } from "./data-context";

interface Props {
  text: string;
  clickable: boolean;
  idx: number;
}

const Answer = ({ text, clickable, idx }: Props) => {
  const [clicked, setClicked] = React.useState(false);

  return (
    <DataContext.Consumer>
      {({ toggleSelection, showCorrect, currCorrect }) => (
        <AnswerContainer clicked={clicked}>
          {clicked ? <GrCheckboxSelected /> : <GrCheckbox />}
          <TextLabel className="answer-text">{text}</TextLabel>
          <ClickableDiv
            clickable={clickable}
            onClick={() => {
              setClicked((currClicked) => !currClicked);
              toggleSelection(idx);
            }}
          >
            {showCorrect &&
              (currCorrect.includes(idx) ? (
                <FcCheckmark />
              ) : (
                clicked && <FcCancel />
              ))}
          </ClickableDiv>
        </AnswerContainer>
      )}
    </DataContext.Consumer>
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
  padding: 20px 20px;
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
  line-height: 1;
`;
