import React, { useState } from "react";
import styled, { CSSProp, keyframes, css } from "styled-components";
import { media } from "../../breakpoints";
import { colors } from "../../colors";
import { InputHook } from "../../hooks/useInput";
import dice from "./dice.png";

const KeyboardWrapper = styled.div`
  margin-bottom: 40px;
`;

const KeyboardRow = styled.div`
  display: flex;
`;

const ArgumentButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  background-color: ${colors.blue};
  border: 1px solid white;
  color: white;
  transition: background-color 150ms ease, border-color 250ms ease;
  font-size: 16px;

  @media ${media.tablet} {
    width: 90px;
  }

  &:focus {
    outline: none;
    border: 1px solid ${colors.greyLight};
  }

  &:active {
    background-color: ${colors.blueLight};
  }
`;

const OperatorButton = styled(ArgumentButton)`
  width: 90px;
  background-color: ${colors.violet};

  &:active {
    background-color: ${colors.violetLight};
  }
`;

const diceAnimation = keyframes`
  0% {
    transform: rotateZ(0);
  }
  100% {
    transform: rotateZ(180deg);
  }
`;

interface AniamtedButtonProps {
  startAnimation?: boolean;
}

const SpecialButton = styled(OperatorButton)<AniamtedButtonProps>`
  width: 48px;
  @media ${media.tablet} {
    width: 90px;
  }

  img {
    width: 22px;
    height: 22px;
    ${({ startAnimation }: AniamtedButtonProps): CSSProp =>
      (startAnimation &&
        css`
          animation: ${diceAnimation} 0.34s ease-in-out forwards;
        `) ||
      ""};
  }
`;

const LongButton = styled(ArgumentButton)`
  width: 117px;
  background-color: ${colors.yellow};

  @media ${media.tablet} {
    width: 180px;
  }
  &:active {
    background-color: ${colors.yellowLight};
  }
`;

interface Props {
  input: InputHook;
  clearTruthTable: () => void;
}

export const VirtualKeyboard = ({
  input,
  clearTruthTable,
}: Props): JSX.Element => {
  const [startAnimation, setStartAnimation] = useState<boolean>(false);
  const { onKeyPress, onClear, onDelete } = input;
  return (
    <KeyboardWrapper>
      <KeyboardRow>
        <ArgumentButton onClick={() => onKeyPress("A ")}>A</ArgumentButton>
        <ArgumentButton onClick={() => onKeyPress("B ")}>B</ArgumentButton>
        <ArgumentButton onClick={() => onKeyPress("C ")}>C</ArgumentButton>
        <OperatorButton onClick={() => onKeyPress("NOT ")}>NOT</OperatorButton>
      </KeyboardRow>
      <KeyboardRow>
        <ArgumentButton onClick={() => onKeyPress("D ")}>D</ArgumentButton>
        <ArgumentButton onClick={() => onKeyPress("E ")}>E</ArgumentButton>
        <ArgumentButton onClick={() => onKeyPress("F ")}>F</ArgumentButton>
        <OperatorButton onClick={() => onKeyPress("AND ")}>AND</OperatorButton>
      </KeyboardRow>
      <KeyboardRow>
        <ArgumentButton onClick={() => onKeyPress("G ")}>G</ArgumentButton>
        <ArgumentButton onClick={() => onKeyPress("P ")}>P</ArgumentButton>
        <ArgumentButton onClick={() => onKeyPress("Q ")}>Q</ArgumentButton>
        <OperatorButton onClick={() => onKeyPress("OR ")}>OR</OperatorButton>
      </KeyboardRow>
      <KeyboardRow>
        <SpecialButton
          startAnimation={startAnimation}
          onClick={(): void => setStartAnimation(true)}
          onAnimationEnd={(): void => setStartAnimation(false)}
        >
          <img src={dice} alt="randomize" />
        </SpecialButton>
        <SpecialButton onClick={() => onKeyPress("(")}>(</SpecialButton>
        <SpecialButton onClick={() => onKeyPress(")")}>)</SpecialButton>
        <OperatorButton onClick={() => onKeyPress("XOR ")}>XOR</OperatorButton>
      </KeyboardRow>
      <KeyboardRow>
        <LongButton onClick={() => onClear(clearTruthTable)}>CLEAR</LongButton>
        <LongButton onClick={() => onDelete()}>DEL</LongButton>
      </KeyboardRow>
    </KeyboardWrapper>
  );
};
