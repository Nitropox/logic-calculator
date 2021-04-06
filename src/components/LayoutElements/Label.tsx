import React from "react";
import styled from "styled-components";

const LabelContainer = styled.div`
  font-size: 14px;
  color: #a2a2a2;
  margin: 6px 0;
`;

interface Props {
  text: string;
}
export const Label = ({ text }: Props): JSX.Element => {
  return <LabelContainer>{text}</LabelContainer>;
};
