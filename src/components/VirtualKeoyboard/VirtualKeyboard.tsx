import { useState } from "react";
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
  clearOutput: () => void;
}

export const VirtualKeyboard = ({
  input,
  clearTruthTable,
  clearOutput,
}: Props): JSX.Element => {
  const [startAnimation, setStartAnimation] = useState<boolean>(false);
  const { onVirtualKeyPress, onClear, onDelete } = input;

  const clearAll = (): void => {
    clearTruthTable();
    clearOutput();
  };

  return (
    <KeyboardWrapper>
      <KeyboardRow>
        <ArgumentButton onClick={() => onVirtualKeyPress("A ")}>
          A
        </ArgumentButton>
        <ArgumentButton onClick={() => onVirtualKeyPress("B ")}>
          B
        </ArgumentButton>
        <ArgumentButton onClick={() => onVirtualKeyPress("C ")}>
          C
        </ArgumentButton>
        <OperatorButton onClick={() => onVirtualKeyPress("NOT ")}>
          NOT
        </OperatorButton>
      </KeyboardRow>
      <KeyboardRow>
        <ArgumentButton onClick={() => onVirtualKeyPress("D ")}>
          D
        </ArgumentButton>
        <ArgumentButton onClick={() => onVirtualKeyPress("E ")}>
          E
        </ArgumentButton>
        <ArgumentButton onClick={() => onVirtualKeyPress("F ")}>
          F
        </ArgumentButton>
        <OperatorButton onClick={() => onVirtualKeyPress("AND ")}>
          AND
        </OperatorButton>
      </KeyboardRow>
      <KeyboardRow>
        <ArgumentButton onClick={() => onVirtualKeyPress("G ")}>
          G
        </ArgumentButton>
        <ArgumentButton onClick={() => onVirtualKeyPress("P ")}>
          P
        </ArgumentButton>
        <ArgumentButton onClick={() => onVirtualKeyPress("Q ")}>
          Q
        </ArgumentButton>
        <OperatorButton onClick={() => onVirtualKeyPress("OR ")}>
          OR
        </OperatorButton>
      </KeyboardRow>
      <KeyboardRow>
        <SpecialButton
          startAnimation={startAnimation}
          onClick={(): void => setStartAnimation(true)}
          onAnimationEnd={(): void => setStartAnimation(false)}
        >
          <img src={dice} alt="randomize" />
        </SpecialButton>
        <SpecialButton onClick={() => onVirtualKeyPress("(")}>(</SpecialButton>
        <SpecialButton onClick={() => onVirtualKeyPress(")")}>)</SpecialButton>
        <OperatorButton onClick={() => onVirtualKeyPress("XOR ")}>
          XOR
        </OperatorButton>
      </KeyboardRow>
      <KeyboardRow>
        <LongButton onClick={() => onClear(clearAll)}>CLEAR</LongButton>
        <LongButton onClick={() => onDelete()}>DEL</LongButton>
      </KeyboardRow>
    </KeyboardWrapper>
  );
};
