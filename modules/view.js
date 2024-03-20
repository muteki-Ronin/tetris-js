import { SIZE_BLOCK, COLUMNS, ROWS } from "../index.js";

export class View {
  constructor(container) {
    this.container = container;
    this.preview();
  }

  colors = {
    J: "FireBrick",
    I: "CadetBlue",
    O: "Gold",
    L: "SlateBlue",
    2: "RoyalBlue",
    T: "Indigo",
    S: "MediumSeaGreen",
  };

  canvas = document.createElement("canvas");
  context = this.canvas.getContext("2d");

  preview() {
    const title = document.createElement("h1");
    title.classList.add("preview");
    title.textContent = "Press ENTER to START!";
    this.container.append(title);
  }

  init() {
    const title = document.querySelector(".preview");
    title.remove();

    this.canvas.classList.add("game-area");
    this.canvas.width = SIZE_BLOCK * COLUMNS;
    this.canvas.height = SIZE_BLOCK * ROWS;
    this.container.append(this.canvas);
  }

  showArea(area) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let y = 0; y < area.length; y++) {
      const line = area[y];

      for (let x = 0; x < line.length; x++) {
        const block = line[x];
        if (block !== "o") {
          this.context.fillStyle = this.colors[block];
          this.context.strokeStyle = "white";
          this.context.fillRect(
            x * SIZE_BLOCK,
            y * SIZE_BLOCK,
            SIZE_BLOCK,
            SIZE_BLOCK
          );
          this.context.strokeRect(
            x * SIZE_BLOCK,
            y * SIZE_BLOCK,
            SIZE_BLOCK,
            SIZE_BLOCK
          );
        }
      }
    }
  }
}
