import React from "react";
import styled from "styled-components";

const SubmitAndNextSection = () => {
  return (
    <div className="test">
      <div>
        <Button></Button>
        <Button></Button>
      </div>
      <Button></Button>
    </div>
  );
};

export default SubmitAndNextSection;

const SectionContainer = styled.div<{}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

const Button = styled.button<{}>``;
