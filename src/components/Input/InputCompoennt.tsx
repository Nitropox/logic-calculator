import { useState } from "react";
import styled from "styled-components";
import { colors } from "../../colors";
import { InputHook } from "../../hooks/useInput";
import calc from "./calc.png";

const InputWrapper = styled.div`
  display: flex;
  margin: 70px 0 40px;
  width: calc(100% - 40px);
  max-width: 780px;
  height: 48px;
`;

const Input = styled.input`
  flex: 1 0 auto;
  height: 48px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border: 1px solid ${colors.greyLight};
  padding-left: 10px;
  color: ${colors.greyDark};
  transition: border-color 250ms ease;

  &:focus {
    outline: none;
    border: 1px solid ${colors.greyMedium};
  }
`;

const EnterButton = styled.button`
  flex: 0 0 48px;
  width: 48px;
  height: 48px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  background-color: ${colors.green};
  border: 1px solid ${colors.green};
  cursor: pointer;
  transition: border-color 250ms ease;

  img {
    width: 28px;
    height: 28px;
  }

  &:focus {
    outline: none;
    border: 1px solid ${colors.greenLight};
  }

  &:active {
    background-color: ${colors.greenDark};

    img {
      width: 26px;
      height: 26px;
    }
  }
`;

interface Props {
  input: InputHook;
}

export const InputComponent = ({ input }: Props): JSX.Element => {
  const { inputValue, onInputUpdate, setProcessing } = input;

  return (
    <InputWrapper>
      <Input
        value={inputValue}
        onChange={(e): void => onInputUpdate(e.target.value)}
      />
      <EnterButton
        onClick={
          inputValue.length ? (): void => setProcessing(true) : undefined
        }
      >
        <img src={calc} alt="calc" />
      </EnterButton>
    </InputWrapper>
  );
};
