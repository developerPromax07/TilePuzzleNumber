const container = document.getElementById("puzzle-container");
const levelText = document.getElementById("level-number");
const nextBtn   = document.getElementById("next-button");

let level = 1;
const maxLevel = 10;
const gridSize = 3;                  // 3×3 puzzle
const tileCount = gridSize*gridSize - 1; // 8 tiles

let tiles = [];

// initial build
createTiles();
nextBtn.addEventListener("click", nextLevel);

function createTiles() {
  tiles = [];
  container.innerHTML = "";

  // numbered tiles
  for (let i = 1; i <= tileCount; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.innerText = i;
    tile.dataset.index = i;
    tile.addEventListener("click", () => moveTile(i));
    tiles.push(tile);
  }

  // the empty slot
  const empty = document.createElement("div");
  empty.className = "tile empty";
  tiles.push(empty);

  shuffleTiles(level * 5);
  render();
  nextBtn.disabled = true;
}

function render() {
  container.innerHTML = "";
  tiles.forEach(t => container.appendChild(t));
}

function shuffleTiles(times) {
  for (let k = 0; k < times; k++) {
    const neighbors = getMovableTiles();
    const rndEl = neighbors[Math.floor(Math.random() * neighbors.length)];
    const idx = parseInt(rndEl.dataset.index);
    moveTile(idx, true);
  }
}

function moveTile(idx, skipCheck = false) {
  const emptyIdx = tiles.findIndex(t => t.classList.contains("empty"));
  const tileIdx  = tiles.findIndex(t => parseInt(t.dataset.index) === idx);

  // if this is a user-click (skipCheck=false) only move if adjacent
  if (!skipCheck && !isNeighbor(tileIdx, emptyIdx)) return;

  [tiles[emptyIdx], tiles[tileIdx]] = [tiles[tileIdx], tiles[emptyIdx]];
  render();

  if (!skipCheck && isSolved()) {
    nextBtn.disabled = false;
  }
}

function getMovableTiles() {
  const emptyIdx = tiles.findIndex(t => t.classList.contains("empty"));
  const row = Math.floor(emptyIdx / gridSize);
  const col = emptyIdx % gridSize;
  const out = [];

  if (row > 0)                   out.push(tiles[emptyIdx - gridSize]);
  if (row < gridSize - 1)        out.push(tiles[emptyIdx + gridSize]);
  if (col > 0)                   out.push(tiles[emptyIdx - 1]);
  if (col < gridSize - 1)        out.push(tiles[emptyIdx + 1]);

  return out;
}

function isNeighbor(a, b) {
  const ax = a % gridSize, ay = Math.floor(a / gridSize);
  const bx = b % gridSize, by = Math.floor(b / gridSize);
  return Math.abs(ax - bx) + Math.abs(ay - by) === 1;
}

function isSolved() {
  for (let i = 0; i < tileCount; i++) {
    if (parseInt(tiles[i].dataset.index) !== i + 1) {
      return false;
    }
  }
  return true;
}

function nextLevel() {
  if (level < maxLevel) {
    level++;
    levelText.textContent = level;
    createTiles();
  } else {
    alert("You've reached the max level!");
  }
}
