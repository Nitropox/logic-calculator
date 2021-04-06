import { useState, useEffect } from "react";

// Adrian's magic function here
const minimize = (inputValue: string): string => {
  return inputValue;
};

interface MinimizeHook {
  minifiedExpression: string;
  clearOutput: () => void;
}
export const useMinimize = (
  inputValue: string,
  processing: boolean
): MinimizeHook => {
  const [minifiedExpression, setMinifiedExpression] = useState<string>("");

  useEffect((): void => {
    if (processing) {
      setMinifiedExpression(minimize(inputValue));
    }
  }, [inputValue, processing]);

  return {
    minifiedExpression,
    clearOutput: (): void => setMinifiedExpression(""),
  };
};
