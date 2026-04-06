class Cell {
  #mark;

  constructor() {
    this.#mark = null;
  }

  isEmpty() {
    if (this.#mark === null) {
      return true;
    }
    return false;
  }

  setMark(mark) {
    this.#mark = mark;
  }

  getMark() {
    return this.#mark;
  }
}

class Player {
  #mark;
  #name;

  constructor(mark, name) {
    this.#mark = mark;
    this.#name = name;
  }

  makeMove(board) {
    // TODO
  }

  getMark() {
    return this.#mark;
  }

  getName() {
    return this.#name;
  }
}

class Board {
  #grid;

  constructor() {
    this.#grid = [
      [new Cell(), new Cell(), new Cell()],
      [new Cell(), new Cell(), new Cell()],
      [new Cell(), new Cell(), new Cell()]
    ];
  }

  initialize() {
    for (let i = 0; i < this.#grid; i++) {
      for (let j = 0; j < this.#grid[i].length; j++) {
        this.#grid[i][j].setMark(null);
      }
    }
  }

  display() {
    // TODO
  }

  placeMark(row, col, mark) {
    if (this.#grid[row][col] !== null) {
      return;
    }
    this.#grid[row][col].setMark(mark);
  }

  checkWin(mark) {
    // 가로, 세로 검사
    for (let i = 0; i < this.#grid.length; i++) {
      if ((this.#grid[i][0] !== null && this.#grid[i][1] !== null && this.#grid[i][2] !== null) &&
          (this.#grid[i][0] === mark) &&
          (this.#grid[i][1] === mark) &&
          (this.#grid[i][2] === mark)) {
        return true;
      }

      if ((this.#grid[0][i] !== null && this.#grid[1][i] !== null && this.#grid[2][i] !== null) &&
          (this.#grid[0][i] === mark) &&
          (this.#grid[1][i] === mark) &&
          (this.#grid[2][i] === mark)) {
        return true;
      }
    }

    // 대각선 검사
    if ((this.#grid[0][0] !== null && this.#grid[1][1] !== null && this.#grid[2][2] !== null) &&
        (this.#grid[0][0] === mark) &&
        (this.#grid[1][1] === mark) &&
        (this.#grid[2][2] === mark)) {
      return true;
    }

    if ((this.#grid[0][2] !== null && this.#grid[1][1] !== null && this.#grid[2][0] !== null) &&
        (this.#grid[0][2] === mark) &&
        (this.#grid[1][1] === mark) &&
        (this.#grid[2][0] === mark)) {
      return true;
    }
    
    return false;
  }

  isFull() {
    for (let i = 0; i < this.#grid.length; i++) {
      for (let j = 0; j < this.#grid[i].length; j++) {
        if (this.#grid[i][j] === null) {
          return false;
        }
      }
    }
    return true;
  }
}

class Game {
  #board;
  #player1;
  #player2;
  #currentPlayer;

  constructor(board, player1, player2) {
    this.#board = board;
    this.#player1 = player1;
    this.#player2 = player2;
    this.#currentPlayer = this.#player1;
  }

  start() {
    // TODO
  }

  switchPlayer() {
    if (this.#currentPlayer === this.#player1) {
      this.#currentPlayer = this.#player2;
    } else {
      this.#currentPlayer = this.#player1;
    }
  }

  announceResult() {
    // TODO
  }
}

const player1Name = prompt("플레이어 1 이름 입력");
const player2Name = prompt("플레이어 2 이름 입력");

const viewUpdater = new ViewUpdater();
const game = new Game(new Player("O", player1Name), new Player("X", player2Name), viewUpdater);

viewUpdater.setPlayer1InfoContent(`${player1Name} -> O`);
viewUpdater.setPlayer2InfoContent(`${player2Name} -> X`);
