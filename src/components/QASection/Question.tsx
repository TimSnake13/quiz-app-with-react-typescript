import React from "react";
import styled from "styled-components";

interface Props {
  text: string;
}

const Question = ({ text }: Props) => {
  return <TitleText>{text}</TitleText>;
};

const TitleText = styled.h3`
  max-width: 600px;
`;

export default Question;
