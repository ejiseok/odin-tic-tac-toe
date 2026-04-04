class Player {
  #symbol;
  #name;

  constructor(symbol, name) {
    this.#symbol = symbol;
    this.#name = name;
  }

  getSymbol() {
    return this.#symbol;
  }

  getName() {
    return this.#name;
  }
}

class ViewUpdater {
  #player1Info;
  #player2Info;
  #finalResult;
  #cells = [[null, null, null], [null, null, null], [null, null, null]];

  #game;

  constructor(game) {
    this.#player1Info = document.querySelector(".player-1");
    this.#player2Info = document.querySelector(".player-2");
    this.#finalResult = document.querySelector(".final-result");

    for (let i = 0; i < 9; i++) {
      const cell = document.querySelector(`.cell-${i}`);
      this.#cells[parseInt(i / 3)][i % 3] = cell;
    }

    this.#game = game;
  }

  setPlayer1InfoContent(text) {
    this.#player1Info.textContent = text;
  }

  setPlayer2InfoContent(text) {
    this.#player2Info.textContent = text;
  }

  setFinalResultContent(text) {
    this.#finalResult.textContent = text;
  }

  drawSymbolCell(symbol, pos) {
    this.#cells[pos[0]][pos[1]].textContent = symbol;
  }

  addHandlerToEachCell() {
    for (let i = 0; i < this.#cells.length; i++) {
      for (let j = 0; j < this.#cells[i].length; j++) {

      }
    }
  }
}

class Game {
  #player1;
  #player2;
  #currentTurnPlayer;
  #playerWhoWin;
  #board;
  #viewUpdater;

  constructor(player1, player2, viewUpdater) {
    this.#player1 = player1;
    this.#player2 = player2;
    this.#viewUpdater = viewUpdater;
    this.#currentTurnPlayer = this.#player1;
    this.#board = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
  }

  #setPlayerWhoWin(player) {
    this.#playerWhoWin = player;
  }

  #switchPlayerTurn() {
    if (this.#currentTurnPlayer === this.#player1) {
      this.#currentTurnPlayer = this.#player2;
    } else {
      this.#currentTurnPlayer = this.#player1;
    }
  }

  #checkWinner(symbol, isDraw) {
    if (isDraw) {
      viewUpdater.setFinalResultContent("무승부");
      return;
    }

    if (symbol === this.#player1.getSymbol()) {
      this.#setPlayerWhoWin(this.#player1);
    } else {
      this.#setPlayerWhoWin(this.#player2);
    }

    viewUpdater.setFinalResultContent(`${this.#playerWhoWin} 승리!`);
  };

  #checkGameEnd() {
    // 가로, 세로 검사
    for (let i = 0; i < this.#board.length; i++) {
      if ((this.#board[i][0] !== null && this.#board[i][1] !== null && this.#board[i][2] !== null) &&
          (this.#board[i][0] === this.#board[i][1] && this.#board[i][1] === this.#board[i][2])) {
        return this.#currentTurnPlayer;
      }

      if ((this.#board[0][i] !== null && this.#board[1][i] !== null && this.#board[2][i] !== null) &&
          (this.#board[0][i] === this.#board[1][i] && this.#board[1][i] === this.#board[2][i])) {
        return this.#currentTurnPlayer;
      }
    }

    // 대각선 검사
    if ((this.#board[0][0] !== null && this.#board[1][1] !== null && this.#board[2][2] !== null) &&
        (this.#board[0][0] === this.#board[1][1] && this.#board[1][1] === this.#board[2][2])) {
      return this.#currentTurnPlayer;
    }

    if ((this.#board[0][3] !== null && this.#board[1][1] !== null && this.#board[2][0] !== null) &&
        (this.#board[0][3] === this.#board[1][1] && this.#board[1][1] === this.#board[2][0])) {
      return this.#currentTurnPlayer;
    }

    // 무승부 체크, 한 개의 칸이라도 null이면 게임 끝 아님
    for (let i = 0; i < this.#board.length; i++) {
      for (let j = 0; j < this.#board[i].length; j++) {
        if (this.#board[i][j] === null) {
          return "NOT_OVER";
        }
      }
    }

    // 무승부
    return "DRAW";
  }

  #markSymbol(pos) {
    if (this.#board[pos[0]][pos[1]] !== null) {
      return;
    }

    this.#board[pos[0]][pos[1]] = this.#currentTurnPlayer.getSymbol();
    viewUpdater.drawSymbolCell(pos, this.#currentTurnPlayer.getSymbol());
    this.#checkGameEnd();
    this.#switchPlayerTurn();
  }
}

const player1Name = prompt("플레이어 1 이름 입력");
const player2Name = prompt("플레이어 2 이름 입력");

const viewUpdater = new ViewUpdater();
const game = new Game(new Player("O", player1Name), new Player("X", player2Name), viewUpdater);

viewUpdater.setPlayer1InfoContent(`${player1Name} -> O`);
viewUpdater.setPlayer2InfoContent(`${player2Name} -> X`);
