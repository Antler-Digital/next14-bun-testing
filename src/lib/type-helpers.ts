import { Tickers } from "../../types";

export function isTicker(ticker: string): ticker is Tickers {
  return ["AAPL", "GOOGL", "AMZN"].includes(ticker);
}
