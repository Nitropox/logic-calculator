import { isOperand } from "./isOperand";

it("checks if isOperand recognizes actual operands", () => {
  expect(isOperand("A")).toBeTruthy();
  expect(isOperand("AND")).toBeFalsy();
});
