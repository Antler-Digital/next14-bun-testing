"use client";

import { useMemo, useState } from "react";
import { generateColor } from "../lib/generate-color";
import { Tickers } from "../../types";
import { isTicker } from "../lib/type-helpers";

export default function Home() {
  const [selectedTicker, setSelectedTicker] = useState<Tickers>("AAPL");
  const [textColor, setTextColor] = useState("gray");

  const tickerMap = useMemo(
    () => ({
      AAPL: (
        <p style={{ color: textColor }} data-testid="aapl">
          An apple a day keeps the doctor away
        </p>
      ),
      GOOGL: (
        <p style={{ color: textColor }} data-testid="googl">
          Google it
        </p>
      ),
      AMZN: (
        <p style={{ color: textColor }} data-testid="amzn">
          Amazing
        </p>
      ),
    }),
    [textColor]
  );

  return (
    <main className="p-20 flex gap-20 min-h-screen h-full bg-zinc-800 items-center justify-center">
      <section className="p-10 min-h-80 bg-emerald-400 shadow-lg w-1/2">
        <div className="flex gap-x-20 h-full">
          <div className="w-1/2 space-y-2">
            <div className="w-full">
              <h2 className="font-bold text-2xl">Input</h2>
              <label htmlFor="ticker">
                <span>Ticker</span>
                {/* options */}
                <select
                  name="ticker"
                  id="ticker"
                  className="p-2 w-full"
                  data-testid="select"
                  onChange={(e) => {
                    if (isTicker(e.target.value)) {
                      setSelectedTicker(e.target.value);
                    }
                  }}
                >
                  <option value="default" disabled>
                    Select one
                  </option>
                  <option value="AAPL" data-testid="select-option">
                    AAPL
                  </option>
                  <option value="GOOGL" data-testid="select-option">
                    GOOGL
                  </option>
                  <option value="AMZN" data-testid="select-option">
                    AMZN
                  </option>
                </select>
              </label>
            </div>
            <div className="w-full">
              <label htmlFor="">
                <span>Change color</span>
                <div className="w-full flex gap-x-4">
                  <button
                    type="button"
                    className="bg-blue-500 p-2 text-white rounded-md w-full"
                    onClick={() => {
                      const randomColor = generateColor("text");
                      setTextColor(randomColor);
                    }}
                  >
                    By name
                  </button>
                  <button
                    type="button"
                    className="bg-gray-500 p-2 text-white rounded-md w-full"
                    onClick={() => {
                      const randomColor = generateColor("hex");
                      setTextColor(randomColor);
                    }}
                  >
                    By hex
                  </button>
                </div>
              </label>
            </div>
          </div>
          <div className="w-1/2 space-y-2">
            <h2 className="font-bold text-2xl">Result</h2>
            {/* result */}
            <div className="text-4xl flex flex-col justify-between h-full">
              <div>{tickerMap[selectedTicker]}</div>
              <div className="text-lg">
                Color:{" "}
                <span className="font-bold" data-testid="text-color">
                  {textColor}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
