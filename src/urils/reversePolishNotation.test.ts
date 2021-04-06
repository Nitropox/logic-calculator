import { reversePolishNotation } from "./reversePolishNotation";

describe("reverse polish notation", (): void => {
  it("A OR B", (): void => {
    expect(reversePolishNotation(["A", "OR", "B"])).toEqual(["A", "B", "OR"]);
  });
  it("A AND B OR C", (): void => {
    expect(reversePolishNotation(["A", "AND", "B", "OR", "C"])).toEqual([
      "A",
      "B",
      "AND",
      "C",
      "OR",
    ]);
  });
  it("A OR B AND C", (): void => {
    expect(reversePolishNotation(["A", "OR", "B", "AND", "C"])).toEqual([
      "A",
      "B",
      "C",
      "AND",
      "OR",
    ]);
  });
  it("(A OR B) AND (C OR D)", (): void => {
    expect(
      reversePolishNotation([
        "(",
        "A",
        "OR",
        "B",
        ")",
        "AND",
        "(",
        "C",
        "OR",
        "D",
        ")",
      ])
    ).toEqual(["A", "B", "OR", "C", "D", "OR", "AND"]);
  });
  it("A OR NOT B", (): void => {
    expect(reversePolishNotation(["A", "OR", "NOT", "B"])).toEqual([
      "A",
      "B",
      "NOT",
      "OR",
    ]);
  });
});
