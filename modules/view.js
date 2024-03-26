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

  preview() {
    const preview = document.createElement("h1");
    preview.textContent = "Press ENTER to START!";
    preview.classList.add("preview");
    this.container.append(preview);
  }

  init() {
    document.querySelector(".preview").remove();

    this.canvas.classList.add("game-area");
    this.canvas.width = SIZE_BLOCK * COLUMNS;
    this.canvas.height = SIZE_BLOCK * ROWS;
    this.container.append(this.canvas);
  }

  createBlockScore() {
    const scoreBlock = document.createElement("div");
    scoreBlock.classList.add("scoreBlock");

    const linesElem = document.createElement("p");
    const scoreElem = document.createElement("p");
    const levelElem = document.createElement("p");
    const recordElem = document.createElement("p");

    scoreBlock.append(linesElem, scoreElem, levelElem, recordElem);

    this.container.append(scoreBlock);

    return (lines, score, level, record) => {
      linesElem.textContent = `Lines: ${lines}`;
      scoreElem.textContent = `Score: ${score}`;
      levelElem.textContent = `Level: ${level}`;
      recordElem.textContent = `Record: ${record}`;
    };
  }

  createBlockNextTetramino() {
    const nextTetraminoBlock = document.createElement("div");
    nextTetraminoBlock.classList.add("nextTetraminoBlock");
    nextTetraminoBlock.style.cssText = `
    width: ${SIZE_BLOCK * 4}px;
    height: ${SIZE_BLOCK * 4}px;
    `;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    nextTetraminoBlock.append(canvas);

    this.container.append(nextTetraminoBlock);

    return (tetramino) => {
      canvas.width = SIZE_BLOCK * tetramino.length;
      canvas.height = SIZE_BLOCK * tetramino.length;
      context.clearRect(0, 0, canvas.width, canvas.height);

      for (let y = 0; y < tetramino.length; y++) {
        const line = tetramino[y];

        for (let x = 0; x < line.length; x++) {
          const block = line[x];
          if (block !== "o") {
            context.fillStyle = this.colors[block];
            context.strokeStyle = "white";
            context.fillRect(
              x * SIZE_BLOCK,
              y * SIZE_BLOCK,
              SIZE_BLOCK,
              SIZE_BLOCK
            );
            context.strokeRect(
              x * SIZE_BLOCK,
              y * SIZE_BLOCK,
              SIZE_BLOCK,
              SIZE_BLOCK
            );
          }
        }
      }
    };
  }

  showArea(area) {
    const context = this.canvas.getContext("2d");
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let y = 0; y < area.length; y++) {
      const line = area[y];

      for (let x = 0; x < line.length; x++) {
        const block = line[x];
        if (block !== "o") {
          context.fillStyle = this.colors[block];
          context.strokeStyle = "white";
          context.fillRect(
            x * SIZE_BLOCK,
            y * SIZE_BLOCK,
            SIZE_BLOCK,
            SIZE_BLOCK
          );
          context.strokeRect(
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
