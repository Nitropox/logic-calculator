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
  height: 90px;
  border: 1px solid ${colors.greyLight};
  border-radius: 4px;
  background-color: ${colors.seledin};
`;

export const OutputComponent = (): JSX.Element => (
  <OutputWrapper>
    <Label text="Wyniki minimalizacji:" />
    <Output />
  </OutputWrapper>
);
