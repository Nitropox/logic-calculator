import { useState, useCallback, useEffect } from "react";

export interface InputHook {
  inputValue: string;
  inputStack: string[];
  onInputUpdate: (text: string) => void;
  onKeyPress: (text: string) => void;
  onClear: (callback?: () => void) => void;
  onDelete: () => void;
  processing: boolean;
  setProcessing: (_: boolean) => void;
}

export const useInput = (): InputHook => {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputStack, setInputStack] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);

  const onInputUpdate = useCallback((text: string): void => {
    const letters = /^[A-Za-z\s]*$/;
    if (text.match(letters)) {
      const textArray = text
        .trim()
        .split(" ")
        .filter((t) => t !== "");
      setInputStack(textArray);
      setInputValue(text);
    }
  }, []);

  const onKeyPress = useCallback((text: string): void => {
    setInputStack((prevValue): string[] => [...prevValue, text.trim()]);
    setInputValue((prevValue): string => {
      const lastLetter = prevValue.slice(-1);
      if (prevValue.length && lastLetter !== " ") {
        return `${prevValue} ${text}`;
      }
      return prevValue + text;
    });
  }, []);

  const onClear = useCallback((callback?: () => void): void => {
    setInputStack([]);
    setInputValue("");
    if (callback) {
      callback();
    }
  }, []);

  const onDelete = useCallback((): void => {
    setIsDeleting(true);
    setInputStack((prevValue): string[] =>
      prevValue.filter((v, i) => i !== prevValue.length - 1)
    );
  }, []);

  useEffect((): void => {
    if (isDeleting) {
      setInputValue(inputStack.join(" "));
      setIsDeleting(false);
    }
  }, [inputStack, isDeleting]);

  return {
    inputValue,
    inputStack,
    onInputUpdate,
    onKeyPress,
    onClear,
    onDelete,
    processing,
    setProcessing,
  };
};
