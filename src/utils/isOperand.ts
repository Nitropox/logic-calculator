export const isOperand = (element: string): boolean => {
  const operators = ["OR", "XOR", "AND", "NOT", "(", ")"];
  return !operators.includes(element);
};
