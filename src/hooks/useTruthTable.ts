import { useEffect, useState } from "react";
import { computeRpnExpression } from "../urils/reversePolishNotation";

/**
 *
 * @param n amount of operands
 * @returns array of all bit states for n arguments eg. for n = 2 returns ['00', '01', '10'. '11']
 */
const allBinaryStates = (n: number): string[] => {
  const totalElements = 2 ** n;
  const arr = new Uint8Array(totalElements);
  const outputArr: string[] = [];
  arr.forEach((el, i) => {
    const bit = arr.join("").concat(i.toString(2));
    outputArr.push(bit.substr(bit.length - n));
  });
  return outputArr;
};

const isOperand = (element: string): boolean => {
  const operators = ["OR", "XOR", "AND", "NOT", "(", ")"];
  return !operators.includes(element);
};

const uniqOperandsList = (inputStack: string[]): string[] => {
  const operands = inputStack.filter((entry) => isOperand(entry));
  return Array.from(new Set(operands));
};

/**
 *
 * @param inputStack initial input stack
 * @param binaryState set of binary states which will replace operands
 * @returns array of strings with replaced operands eg. for ['A', 'OR', 'B'] it returns ['0','OR','1']
 */
const replaceOperands = (
  inputStack: string[],
  binaryState: string[]
): string[] => {
  const allOperands = inputStack.filter((entry) => isOperand(entry));
  return inputStack.map((entry) =>
    isOperand(entry) ? binaryState[allOperands.indexOf(entry)] : entry
  );
};

export const generateTruthTable = (inputStack: string[]): string[][] => {
  const n = uniqOperandsList(inputStack).length;
  const binaryStates = allBinaryStates(n);
  const output: string[][] = [];
  binaryStates.forEach((binaryState) => {
    const bs = binaryState.split("");
    const expr = replaceOperands(inputStack, bs);
    output.push(bs.concat(computeRpnExpression(expr)));
  });
  return output;
};

interface TruthTableHook {
  truthTable: string[][];
  tableHeader: string[];
  clearTruthTable: () => void;
}

export const useTruthTable = (
  inputStack: string[],
  processing: boolean,
  setProcessing: (_: boolean) => void
): TruthTableHook => {
  const [truthTable, setTruthTable] = useState<string[][]>([]);
  const [tableHeader, setTableHeader] = useState<string[]>([]);

  useEffect((): void => {
    if (processing) {
      setTruthTable(generateTruthTable(inputStack));
      setTableHeader(uniqOperandsList(inputStack).concat("Y"));
      setProcessing(false);
    }
  }, [inputStack, processing, setProcessing]);

  return {
    truthTable,
    tableHeader,
    clearTruthTable: (): void => setTruthTable([]),
  };
};
