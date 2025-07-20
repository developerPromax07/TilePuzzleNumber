/* preserve box-sizing */
*, *::before, *::after {
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  text-align: center;
  background: linear-gradient(to right, #223344, #778899);
  margin: 0;
  padding: 20px;
  color: #fff;
}

h1 {
  margin-bottom: 20px;
}

/* 3×3 grid with 2px gaps so the outer border never overflows */
#puzzle-container {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows:    repeat(3, 100px);
  gap: 2px;
  width:  calc(3*100px + 2*2px);
  height: calc(3*100px + 2*2px);
  margin: 0 auto 20px;
  border: 3px solid #fff;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

.tile {
  width: 100%;
  height: 100%;
  color: #fff;
  font-size: 32px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  user-select: none;
  transition: background-color 0.2s;
}

/* numbered tiles get pointer & hover */
.tile:not(.empty) {
  cursor: pointer;
}
.tile:not(.empty):hover {
  background-color: #2daae1 !important;
}

/* empty slot is always light red, no hover */
.tile.empty {
  background-color: #ffcccc !important;
  cursor: default;
}

#next-button {
  padding: 10px 20px;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  background-color: #4caf50;
  color: #fff;
  cursor: pointer;
}
#next-button:disabled {
  background-color: gray;
  cursor: not-allowed;
}
