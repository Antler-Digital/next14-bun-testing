## Introduction

- BunJS + Next14
- TailwindCSS
- Happy-DOM + React Testing Library

### Setup

- Install BunJS
- Use BunJS to setup Next14
- Add Tailwind
- Install and configure testing environment
- Copy paste the main page

```bash
# IN TERMINAL

# typescript, eslint, src, app
➜ bun create next-app
➜ bun add -d @happy-dom/global-registrator @testing-library/react @types/bun

➜ touch happydom.ts bunfig.toml
```

```bash
# add TailwindCSS - https://tailwindcss.com/docs/guides/nextjs
➜ bun add -D tailwindcss postcss autoprefixer
➜ bunx tailwindcss init -p

➜ bun install

# test the runner - will fail
➜ bun test

# IN EDITOR
➜ rm src/app/page.module.css
```

```tsx
// happydom.ts

import { GlobalRegistrator } from "@happy-dom/global-registrator";

GlobalRegistrator.register();
```

```toml
# bunfig.toml

[test]
preload = "./happydom.ts"
```

```tsx
// src/app/page.tsx

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
```

## Lib + Unit tests

```tsx
// src/lib/generate-color.ts

export const COLORS = ["red", "blue", "green", "yellow", "purple"];

export const generateColor = (type: "text" | "hex" = "text") => {
  if (type === "hex") {
    // generate hex color
    const hexColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return hexColor;
  }
  const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
  return randomColor;
};
```

```tsx
// src/lib/tests/generate-color.test.ts

import { expect, describe, it } from "bun:test";
import { COLORS, generateColor } from "../generate-color";

describe("generateColor", () => {
  it("should return a color", () => {
    const color = generateColor();

    // the color should be defined
    expect(color).toBeDefined();

    // the color should be a specific string
    expect(color).toMatch(/red|blue|green|yellow|purple/);

    // the color should be one of the predefined colors
    expect(COLORS).toContain(color);
  });

  it("should return a hex color", () => {
    const color = generateColor("hex");
    expect(color).toMatch(/^#[0-9A-F]{6}$/i);
  });
});
```

```tsx
// src/lib/type-helpers.ts

import { Tickers } from "../../types";

export function isTicker(ticker: string): ticker is Tickers {
  return ["AAPL", "GOOGL", "AMZN"].includes(ticker);
}

```

```tsx
// src/lib/tests/type-helpers.test.ts

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

```

## Integration tests with React Testing Library

```tsx
// __tests__/page.test.tsx

import { expect, describe, it, beforeEach } from "bun:test";
import { act, fireEvent, render, screen } from "@testing-library/react";
import MainPage from "../src/app/page";

// helper to test the common elements of the page every time

function testCommonElements() {
  // input half
  expect(screen.getByRole("heading", { name: /input/i })).not.toBeNull();
  expect(screen.getByText(/ticker/i)).not.toBeNull();
  expect(screen.getByText(/change color/i)).not.toBeNull();
  expect(
    screen.getByRole("button", {
      name: /by name/i,
    })
  ).not.toBeNull();
  expect(
    screen.getByRole("button", {
      name: /by hex/i,
    })
  ).not.toBeNull();

  // result half
  expect(screen.getByRole("heading", { name: /result/i })).not.toBeNull();
  expect(screen.getByText(/color:/i)).not.toBeNull();

  // initial state

  expect(
    screen.getByRole("option", {
      name: /aapl/i,
      selected: true,
    })
  ).not.toBeNull();

  expect(
    screen.getByRole("option", {
      name: /googl/i,
      selected: false,
    })
  ).not.toBeNull();

  expect(
    screen.getByRole("option", {
      name: /amzn/i,
      selected: false,
    })
  ).not.toBeNull();

  expect(
    screen.getByText(/an apple a day keeps the doctor away/i)
  ).not.toBeNull();
}

describe("main page", () => {
  beforeEach(() => {
    // clear the document body
    document.body.innerHTML = "";
  });

  it("should render all elements without throwing", () => {
    expect(() => render(<MainPage />)).not.toThrow();

    testCommonElements();
  });

  describe("change text", () => {
    it("should change the text to GOOGL", () => {
      render(<MainPage />);

      testCommonElements();

      // GOOGL is NOT selected
      expect(
        screen.getByRole("option", {
          name: /googl/i,
          selected: false,
        })
      ).not.toBeNull();

      expect(screen.queryByText(/google it/i)).toBeNull();

      // change the select value

      fireEvent.change(screen.getByTestId("select"), {
        target: { value: "GOOGL" },
      });

      // GOOGL IS selected

      expect(
        screen.getByRole("option", {
          name: /googl/i,
          selected: true,
        })
      ).not.toBeNull();

      expect(screen.queryByText(/google it/i)).not.toBeNull();
    });

    it("should change the text to AMZN", () => {
      render(<MainPage />);

      testCommonElements();

      // AMZN is NOT selected
      expect(
        screen.getByRole("option", {
          name: /amzn/i,
          selected: false,
        })
      ).not.toBeNull();

      expect(screen.queryByText(/amazing/i)).toBeNull();

      // change the select value

      fireEvent.change(screen.getByTestId("select"), {
        target: { value: "AMZN" },
      });

      // AMZN IS selected

      expect(
        screen.getByRole("option", {
          name: /amzn/i,
          selected: true,
        })
      ).not.toBeNull();

      expect(screen.queryByText(/amazing/i)).not.toBeNull();
    });
  });

  describe("change color", () => {
    it("change color by name", () => {
      render(<MainPage />);

      testCommonElements();

      // initial color
      const defaultColor = screen.getByTestId("text-color")
        .textContent as string;

      expect(screen.getByTestId("aapl").style.color).toBe(defaultColor);

      // change color
      fireEvent.click(
        screen.getByRole("button", {
          name: /by name/i,
        })
      );

      const newColor = screen.getByTestId("text-color").textContent as string;

      // new color
      expect(screen.getByTestId("aapl").style.color).toBe(newColor);
    });

    it("change color by hex", () => {
      render(<MainPage />);

      testCommonElements();

      // initial color
      const defaultColor = screen.getByTestId("text-color")
        .textContent as string;

      expect(screen.getByTestId("aapl").style.color).toBe(defaultColor);

      // change color
      fireEvent.click(
        screen.getByRole("button", {
          name: /by hex/i,
        })
      );

      const newColor = screen.getByTestId("text-color").textContent as string;

      // new color
      expect(screen.getByTestId("aapl").style.color).toBe(newColor);
    });
  });
});

```
