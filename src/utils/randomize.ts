type BinaryOperator = "OR" | "XOR" | "AND";
const binaryOperators: BinaryOperator[] = ["OR", "XOR", "AND"];
const operands = ["A", "B", "C", "D"];

const getRandomInt = (min: number, max: number): number => {
  const minNum = Math.ceil(min);
  return Math.floor(Math.random() * (Math.floor(max) - minNum + 1)) + minNum;
};

class RandomExpression {
  firstOperand: string | RandomExpression;

  isFirstOperandNegated: boolean;

  secondOperand: string | RandomExpression;

  isSecondOperandNegated: boolean;

  binaryOperator: BinaryOperator;

  constructor() {
    this.firstOperand = randomOperand(operands);
    this.isFirstOperandNegated = !!getRandomInt(0, 1);
    this.secondOperand = randomSecondOperand(this.firstOperand);
    this.isSecondOperandNegated = !!getRandomInt(0, 1);
    this.binaryOperator = binaryOperators[getRandomInt(0, 2)];
  }
}

const randomOperand = (startingArray: string[]): string | RandomExpression => {
  const randNum = getRandomInt(0, startingArray.length);
  return randNum > startingArray.length - 1
    ? new RandomExpression()
    : startingArray[randNum];
};

const randomSecondOperand = (
  firstOperand: string | RandomExpression
): string | RandomExpression => {
  if (typeof firstOperand === "string") {
    const newOperands = operands.filter((operand) => operand !== firstOperand);
    return randomOperand(newOperands);
  }
  return randomOperand(operands);
};

const stringifyExpression = (randExp: RandomExpression): string => {
  const output: string[] = [];

  if (randExp.isFirstOperandNegated) {
    output.push("NOT");
  }

  if (typeof randExp.firstOperand === "string") {
    output.push(randExp.firstOperand);
  } else {
    output.push(`( ${stringifyExpression(randExp.firstOperand)} )`);
  }

  output.push(randExp.binaryOperator);

  if (randExp.isSecondOperandNegated) {
    output.push("NOT");
  }

  if (typeof randExp.secondOperand === "string") {
    output.push(randExp.secondOperand);
  } else {
    output.push(`( ${stringifyExpression(randExp.secondOperand)} )`);
  }

  return output.join(" ");
};

export const randomize = (): string => {
  const randExp = new RandomExpression();
  return stringifyExpression(randExp);
};
