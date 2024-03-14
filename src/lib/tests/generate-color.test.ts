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
