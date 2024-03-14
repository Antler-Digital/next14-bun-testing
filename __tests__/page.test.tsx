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
