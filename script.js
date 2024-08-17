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
      const vertex = {
        coords: [coords1, coords2],
        visited: false,
        path: null,
        allowedMoves: [],
      };
      vertex.allowedMoves = this.getAllowedMoves(vertex.coords);
      graph[vertex.coords] = vertex;
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

  getAllowedMoves(coords) {
    const allowedMoves = [
      [2, 1],
      [1, 2],
      [-2, 1],
      [-1, 2],
      [2, -1],
      [1, -2],
      [-2, -1],
      [-1, -2],
    ];
    for (let i = 0; i < 8; i++) {
      const move = allowedMoves[i];
      const updatedMove = [coords[0] + move[0], coords[1] + move[1]];
      if (updatedMove[0] < 0 || updatedMove[0] > 7) continue;
      if (updatedMove[1] < 0 || updatedMove[1] > 7) continue;
      allowedMoves.push(updatedMove);
    }
    return allowedMoves.slice(8, 16);
  }
}

const game = new Game(8);
console.log(game.graph);
