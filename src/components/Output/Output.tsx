import styled from "styled-components";
import { colors } from "../../colors";
import { Label } from "../LayoutElements/Label";

const OutputWrapper = styled.div`
  width: calc(100% - 40px);
  max-width: 780px;
`;
const Output = styled.div`
  display: flex;
  margin: 0 0 40px;
  width: 100%;
  max-width: 780px;
  border: 1px solid ${colors.greyLight};
  border-radius: 4px;
  background-color: ${colors.seledin};
  padding: 16px;
  min-height: 48px;
`;

interface Props {
  minifiedExpression: string;
}

export const OutputComponent = ({ minifiedExpression }: Props): JSX.Element => (
  <OutputWrapper>
    <Label text="Wynik minimalizacji:" />
    <Output>{minifiedExpression}</Output>
  </OutputWrapper>
);
