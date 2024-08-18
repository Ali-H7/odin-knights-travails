class Game {
  constructor() {
    this.graph = this.generateGraph(8);
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

  findShortestPath(start) {
    const queue = [this.graph[start]];
    queue[0].visited = true;
    queue[0].path = queue[0].coords;

    while (queue.length != 0) {
      const currentTile = queue.shift();
      for (let i = 0; i < currentTile.allowedMoves.length; i++) {
        let linkedTile = currentTile.allowedMoves[i];
        linkedTile = this.graph[linkedTile];
        if (linkedTile.visited) continue;
        linkedTile.visited = true;
        linkedTile.path = currentTile;
        queue.push(linkedTile);
      }
    }
  }

  printShortestPath(start, end) {
    let endTile = this.graph[end];
    let coords = endTile.coords;
    const path = [];
    while (!(coords[0] === start[0] && coords[1] === start[1])) {
      path.push(endTile.coords);
      endTile = endTile.path;
      coords = endTile.coords;
    }
    path.push(endTile.coords);
    path.reverse();
    console.log(`You made it in ${path.length - 1} moves ! Here's your path:`);
    path.forEach((tile) => console.log(tile));
  }

  knightMoves(start, end) {
    this.findShortestPath(start);
    this.printShortestPath(start, end);
    //reset the graph
    this.graph = this.generateGraph(8);
  }
}

const game = new Game();
game.knightMoves([3, 3], [3, 4]);
game.knightMoves([3, 3], [7, 7]);
game.knightMoves([0, 0], [7, 7]);
