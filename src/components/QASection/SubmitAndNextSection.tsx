import React from "react";
import styled from "styled-components";
import { GrCaretPrevious, GrCaretNext } from "react-icons/gr";
import { DataContext } from "./data-context";

const SubmitAndNextSection = () => {
  return (
    <DataContext.Consumer>
      {({ submitAnswer }) => (
        <SectionContainer>
          <LeftDiv>
            <Button margin_right>
              <GrCaretPrevious></GrCaretPrevious>
            </Button>
            <Button>
              <GrCaretNext></GrCaretNext>
            </Button>
          </LeftDiv>
          <Button primary onClick={() => submitAnswer()}>
            Submit
          </Button>
        </SectionContainer>
      )}
    </DataContext.Consumer>
  );
};

export default SubmitAndNextSection;

const SectionContainer = styled.div<{}>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  margin-top: 30px;
`;

const LeftDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const Button = styled.div<{ primary?: boolean; margin_right?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  font-weight: ${(props) => props.primary && 700};
  padding: 10px 15px;
  border-radius: 6px;
  margin-right: ${(props) => props.margin_right && "10px"};
  cursor: pointer;
`;
