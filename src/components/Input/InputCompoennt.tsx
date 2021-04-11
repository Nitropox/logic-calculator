import { forwardRef, ForwardedRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import styled, { css, CSSProp } from "styled-components";
import { colors } from "../../colors";
import { InputHook } from "../../hooks/useInput";
import calc from "./calc.png";

const InputWrapper = styled.div`
  display: flex;
  position: relative;
  margin: 70px 0 40px;
  width: calc(100% - 40px);
  max-width: 780px;
  height: 48px;
`;

interface InputProps {
  inputError: boolean;
}

const Input = styled.input<InputProps>`
  flex: 1 0 auto;
  height: 48px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border: 1px solid ${colors.greyLight};
  padding-left: 10px;
  color: ${colors.greyDark};
  transition: border-color 250ms ease;

  ${({ inputError }: InputProps): CSSProp =>
    (inputError &&
      css`
        border: 1px solid red;
      `) ||
    ""};

  &:focus {
    outline: none;
    border: 1px solid ${colors.greyMedium};
  }

  &::placeholder {
    color: ${colors.greyMedium};
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

const Error = styled.div`
  position: absolute;
  font-size: 12px;
  color: red;
  bottom: -20px;
`;
interface Props {
  input: InputHook;
}

// eslint-disable-next-line react/display-name
export const InputComponent = forwardRef(
  ({ input }: Props, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
    const { inputValue, onInputUpdate, validateInput, inputError } = input;
    const { t } = useTranslation();

    const handleEnterKeyPress = useCallback(
      (event) => {
        const { key } = event;

        if (inputValue.length && key === "Enter") {
          validateInput();
        }
      },
      [inputValue.length, validateInput]
    );

    useEffect((): (() => void) => {
      window.addEventListener("keydown", handleEnterKeyPress);

      return (): void => {
        window.removeEventListener("keydown", handleEnterKeyPress);
      };
    }, [handleEnterKeyPress]);

    return (
      <InputWrapper>
        <Input
          ref={ref}
          value={inputValue}
          onChange={(e): void => onInputUpdate(e.target.value)}
          inputError={!!inputError}
          placeholder={t("inputPlaceholder")}
        />
        <EnterButton
          onClick={inputValue.length ? (): void => validateInput() : undefined}
        >
          <img src={calc} alt="calc" />
        </EnterButton>
        <Error>{inputError}</Error>
      </InputWrapper>
    );
  }
);
