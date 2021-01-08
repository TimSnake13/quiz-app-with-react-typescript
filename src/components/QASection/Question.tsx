import React from "react";
import styled from "styled-components";

interface Props {
  text: string;
}

const Question = ({ text }: Props) => {
  return <TitleText>{text}</TitleText>;
};

const TitleText = styled.h3`
  max-width: 800px;
  margin-bottom: 30px;
  line-height: 150%;
`;

export default Question;
