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
