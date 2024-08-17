class Game {
  constructor(boardSize) {
    this.graph = this.generateGraph(boardSize);
  }

  generateGraph(size) {
    const graph = {};
    let boardSize = size * size;
    let tileCount = 1;
    let coords1 = 0;
    let coords2 = 0;
    while (boardSize > 0) {
      const tile = `Tile[${tileCount}]`;
      const vertex = {
        coords: [coords1, coords2],
        visited: false,
        path: null,
        allowedMoves: [],
      };
      graph[tile] = vertex;
      tileCount++;
      coords2++;
      boardSize--;
      if (coords2 > size - 1) {
        coords2 = 0;
        coords1++;
      }
    }
    return graph;
  }
}

const game = new Game(8);
console.log(game.graph);
