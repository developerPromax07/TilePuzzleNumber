const container = document.getElementById("puzzle-container");
const levelText = document.getElementById("level-number");
const nextBtn   = document.getElementById("next-button");

let level = 1;
const maxLevel = 10;
const gridSize = 3;                    // 3×3 puzzle
const tileCount = gridSize * gridSize - 1; // 8 tiles

let tiles = [];

// build initial board
createTiles();
nextBtn.addEventListener("click", nextLevel);

function createTiles() {
  tiles = [];
  container.innerHTML = "";

  // numbered tiles 1..tileCount
  for (let i = 1; i <= tileCount; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.innerText = i;
    tile.dataset.index = i;

    // rainbow color: spread hues evenly
    const hue = Math.round((i - 1) * (360 / tileCount));
    tile.style.backgroundColor = `hsl(${hue}, 65%, 55%)`;

    tile.addEventListener("click", () => moveTile(i));
    tiles.push(tile);
  }

  // one empty slot
  const empty = document.createElement("div");
  empty.className = "tile empty";
  // ensure it's white
  empty.style.backgroundColor = "#fff";
  tiles.push(empty);

  // shuffle (difficulty = level × 5 moves)
  shuffleTiles(level * 5);

  render();
  nextBtn.disabled = true;
}

// draw tiles into the container
function render() {
  container.innerHTML = "";
  tiles.forEach(t => container.appendChild(t));
}

// perform a series of random legal moves
function shuffleTiles(times) {
  for (let k = 0; k < times; k++) {
    const neighbors = getMovableTiles();
    const rndEl = neighbors[Math.floor(Math.random() * neighbors.length)];
    const idx = parseInt(rndEl.dataset.index);
    moveTile(idx, true);
  }
}

// move tile with dataset.index = idx if adjacent to empty
// skipCheck=true bypasses adjacency check (used during shuffle)
function moveTile(idx, skipCheck = false) {
  const emptyIdx = tiles.findIndex(t => t.classList.contains("empty"));
  const tileIdx  = tiles.findIndex(t => parseInt(t.dataset.index) === idx);

  if (!skipCheck && !isNeighbor(tileIdx, emptyIdx)) return;

  // swap in array
  [tiles[emptyIdx], tiles[tileIdx]] = [tiles[tileIdx], tiles[emptyIdx]];
  render();

  // if user move and solved, unlock next level
  if (!skipCheck && isSolved()) {
    nextBtn.disabled = false;
  }
}

// return tiles that can slide into the empty slot
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

// are indices a,b adjacent on the grid?
function isNeighbor(a, b) {
  const ax = a % gridSize, ay = Math.floor(a / gridSize);
  const bx = b % gridSize, by = Math.floor(b / gridSize);
  return Math.abs(ax - bx) + Math.abs(ay - by) === 1;
}

// check if the numbered tiles are in order 1→8, empty last
function isSolved() {
  for (let i = 0; i < tileCount; i++) {
    if (parseInt(tiles[i].dataset.index) !== i + 1) {
      return false;
    }
  }
  return true;
}

// advance to next level (up to maxLevel)
function nextLevel() {
  if (level < maxLevel) {
    level++;
    levelText.textContent = level;
    createTiles();
  } else {
    alert("You've reached the max level!");
  }
}
