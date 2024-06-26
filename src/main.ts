import { colord, extend } from "colord";
import mixPlugin from "colord/plugins/mix";

extend([mixPlugin]);

// oklch(26% 0.03 290)
const bg = "#242232"; /* black */

const colors = [
  { source: "oklch(30% 0.03 290)", color: "#2d2b3c", name: "black" },
  { source: "oklch(75% 0.15 13)", color: "#fd8293", name: "red" },
  { source: "oklch(85% 0.12 158.64)", color: "#84e6b1", name: "green" },
  { source: "oklch(85% 0.09 85)", color: "#e9ca89", name: "yellow" },
  { source: "oklch(80% 0.08 267)", color: "#a7bdf2", name: "blue" },
  { source: "oklch(80% 0.11 337)", color: "#eba2d8", name: "magenta" },
  { source: "oklch(80% 0.11 181)", color: "#60d5c2", name: "cyan" },
  { source: "oklch(94% 0.01 290)", color: "#ebeaf2", name: "white" },
].reduce<{ name: string; source?: string; color: string }[]>(
  (acc, item) => [
    ...acc,
    item,
    {
      name: `${item.name} light`,
      color: colord(item.color)
        .lighten(item.name === "black" ? 0.15 : 0.1)
        .toHex(),
    },
    {
      name: `${item.name} dim`,
      color: colord(item.color).mix(colord(bg), 0.5).toHex(),
    },
  ],
  [],
);

const elmItems = document.querySelector<HTMLElement>(".theme__items");

for (const color of colors) {
  console.log({ color });
  const elmDiv = document.createElement("div");
  elmDiv.style.backgroundColor = color.color;
  elmItems?.appendChild(elmDiv);

  const elmCodeName = document.createElement("code");
  const elmCodeNameContent = document.createTextNode(color.name);
  elmCodeName.appendChild(elmCodeNameContent);
  elmDiv.appendChild(elmCodeName);

  const elmCodeHex = document.createElement("code");
  const elmCodeHexContent = document.createTextNode(color.color);
  elmCodeHex.appendChild(elmCodeHexContent);
  elmDiv.appendChild(elmCodeHex);

  if (color.source) {
    const elmCodeSource = document.createElement("code");
    const elmCodeCourceContent = document.createTextNode(color.source);
    elmCodeSource.appendChild(elmCodeCourceContent);
    elmDiv.appendChild(elmCodeSource);
  }
}
