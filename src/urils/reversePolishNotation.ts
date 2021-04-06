/* eslint-disable no-bitwise */
const operators = ["OR", "XOR", "AND", "NOT"];

export const reversePolishNotation = (inputStack: string[]): string[] => {
  const outputStack: string[] = [];
  const operatorsStack: string[] = [];
  inputStack.forEach((element) => {
    if (operators.includes(element)) {
      while (
        operatorsStack.includes(operatorsStack[operatorsStack.length - 1]) &&
        operators.indexOf(element) <=
          operators.indexOf(operatorsStack[operatorsStack.length - 1])
      ) {
        const el = operatorsStack.pop();
        if (el) {
          outputStack.push(el);
        }
      }
      operatorsStack.push(element);
    } else if (element === "(") {
      operatorsStack.push(element);
    } else if (element === ")") {
      let el = operatorsStack.pop();
      while (el !== "(" && el) {
        outputStack.push(el);
        el = operatorsStack.pop();
      }
    } else {
      outputStack.push(element);
    }
  });
  return outputStack.concat(operatorsStack.reverse());
};

export const computeRpnExpression = (inputStack: string[]): string => {
  const rpnStack = reversePolishNotation(inputStack);
  const stack: number[] = [];
  rpnStack.forEach((entry) => {
    if (!operators.includes(entry)) {
      stack.push(Number(entry));
    } else if (entry === "NOT") {
      const el = stack.pop();
      if (el !== undefined) {
        stack.push(el === 1 ? 0 : 1);
      }
    } else if (["OR", "AND", "XOR"].includes(entry)) {
      const el1 = stack.pop();
      const el2 = stack.pop();
      if (el1 !== undefined && el2 !== undefined) {
        if (entry === "OR") {
          stack.push(el1 | el2);
        } else if (entry === "AND") {
          stack.push(el1 & el2);
        } else if (entry === "XOR") {
          stack.push(el1 ^ el2);
        }
      }
    }
  });

  return stack[0].toString();
};
