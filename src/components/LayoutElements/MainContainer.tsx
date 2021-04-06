import styled from "styled-components";
import { colors } from "../../colors";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const InnerWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  width: 1000px;
  margin: 0 auto;
  background-color: ${colors.greyWhite};
`;
