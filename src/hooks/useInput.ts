import { useState, useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { isOperand } from "../utils/isOperand";
import { randomize } from "../utils/randomize";

export interface InputHook {
  inputValue: string;
  inputStack: string[];
  onInputUpdate: (text: string) => void;
  onVirtualKeyPress: (text: string) => void;
  onClear: (callback?: () => void) => void;
  onDelete: () => void;
  processing: boolean;
  setProcessing: (_: boolean) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  validateInput: () => void;
  inputError?: string;
  generateRandomExpression: () => void;
}

export const useInput = (): InputHook => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState<string>("");
  const [inputStack, setInputStack] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);
  const [inputError, setInputError] = useState<string>();

  const inputRef = useRef<HTMLInputElement>(null);

  const onInputUpdate = useCallback((text: string): void => {
    setInputError(undefined);
    const letters = /^[A-Za-z()\s]*$/;
    if (text.match(letters)) {
      const textArray = text
        .replace(/\(/g, " ( ")
        .replace(/\)/g, " ) ")
        .toUpperCase()
        .split(" ")
        .filter((tx) => tx !== "");
      setInputStack(textArray);
      setInputValue(text.toUpperCase());
    }
  }, []);

  const onVirtualKeyPress = useCallback((text: string): void => {
    setInputError(undefined);
    setInputStack((prevValue): string[] => [...prevValue, text.trim()]);
    setInputValue((prevValue): string => {
      const lastLetter = prevValue.slice(-1);
      if (prevValue.length && lastLetter !== " ") {
        return `${prevValue} ${text}`;
      }
      return prevValue + text;
    });
  }, []);

  const validateInput = useCallback((): void => {
    const operands = inputStack.filter((entry) => isOperand(entry));
    const operatorsWithoutNOT = inputStack.filter(
      (entry) => !["NOT", "(", ")"].includes(entry) && !isOperand(entry)
    );
    const expStructure: (1 | 0)[] = inputStack
      .filter((entry) => !["NOT", "(", ")"].includes(entry))
      .map((entry) => (isOperand(entry) ? 1 : 0));
    const noOperands = !operands.length;
    const notEnoughOperands = operands.length <= operatorsWithoutNOT.length;
    let temp = 2;
    const validExpression = expStructure.every((el) => {
      if (el !== temp) {
        temp = el;
        return true;
      }
      return false;
    });

    if (noOperands) {
      setInputError(t("errorNoOperands"));
    } else if (!validExpression || notEnoughOperands) {
      setInputError(t("errorNotValidExpr"));
    } else {
      setProcessing(true);
    }
  }, [inputStack, t]);

  const onClear = useCallback((callback?: () => void): void => {
    setInputError(undefined);
    setInputStack([]);
    setInputValue("");
    if (callback) {
      callback();
    }
  }, []);

  const generateRandomExpression = useCallback((): void => {
    onClear();
    const rndExp = randomize();
    setInputValue(rndExp);
    setInputStack(rndExp.split(" "));
  }, [onClear]);

  const onDelete = useCallback((): void => {
    setInputError(undefined);
    setIsDeleting(true);
    setInputStack((prevValue): string[] =>
      prevValue.filter((_, i) => i !== prevValue.length - 1)
    );
  }, []);

  useEffect((): void => {
    if (isDeleting) {
      setInputValue(inputStack.join(" "));
      setIsDeleting(false);
    }
  }, [inputStack, isDeleting]);

  useEffect((): void => {
    if (inputRef.current) {
      const input = inputRef.current;
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
      input.scrollLeft = input.scrollWidth;
    }
  }, [inputStack]);

  return {
    inputValue,
    inputStack,
    onInputUpdate,
    onVirtualKeyPress,
    onClear,
    onDelete,
    processing,
    setProcessing,
    inputRef,
    validateInput,
    inputError,
    generateRandomExpression,
  };
};
