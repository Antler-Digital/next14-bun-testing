import { expect, describe, it } from "bun:test";
import { isTicker } from "../type-helpers";

const tickers = [
  {
    value: "AAPL",
    expected: true,
  },
  {
    value: "GOOGL",
    expected: true,
  },
  {
    value: "AMZN",
    expected: true,
  },
  {
    value: "MSFT",
    expected: false,
  },
  {
    value: "TSLA",
    expected: false,
  },
  {
    value: "FB",
    expected: false,
  },
];

describe("isTicker", () => {
  it("should validate tickers", () => {
    tickers.forEach(({ value, expected }) => {
      expect(isTicker(value)).toBe(expected);
    });
  });
});
