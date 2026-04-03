// const Player = function(symbol, name) {
//   const _symbol = symbol;
//   const _name = name;

//   const getSymbol = function() {
//     return _symbol;
//   }

//   const getName = function() {
//     return _name;
//   }

//   return {
//     getSymbol,
//     getName
//   };
// };

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

  constructor() {
    this.#player1Info = document.querySelector(".player-1");
    this.#player2Info = document.querySelector(".player-2");
    this.#finalResult = document.querySelector(".final-result");

    for (let i = 0; i < 9; i++) {
      const cell = document.querySelector(`.cell-${i}`);
      this.#cells[parseInt(i / 3)][i % 3] = cell;
    }
  }

  setPlayer1InfoContent(text) {
    this.#player1Info.textContent = text;
  }

  setPlayer2Content(text) {
    this.#player2Info.textContent = text;
  }

  setFinalResultContent(text) {
    this.#finalResult.textContent = text;
  }

  drawSymbolCell(symbol, pos) {
    this.#cells[pos[0]][pos[1]].textContent = symbol;
  }
}

class Game {
  #player1;
  #player2;
  #currentTurnPlayer;
  #board;

  constructor(player1, player2) {
    this.#player1 = player1;
    this.#player2 = player2;
    this.#currentTurnPlayer = this.#player1;
    this.#board = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
  }

  #switchPlayerTurn() {
    if (this.#currentTurnPlayer === this.#player1) {
      this.#currentTurnPlayer = this.#player2;
    } else {
      this.#currentTurnPlayer = this.#player1;
    }
  }

  markSymbol(pos) {
    if (this.#board[pos[0]][pos[1]] !== null) {
      return;
    }
    this.#board[pos[0]][pos[1]] = this.#currentTurnPlayer.getSymbol();
    this.#switchPlayerTurn();
  }
}

const game = (function() {
  const player1 = null;
  const player2 = null;
  const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];

  let currentTurnPlayer = player1;
  let playerWhoWin = null;

  const setPlayer1 = function(symbol, name) {
    player1 = new Player(symbol, name);
  }

  const setPlayer2 = function(symbol, name) {
    player2 = new Player(symbol, name);
  }

  const setPlayerWhowin = function(player) {
    playerWhoWin = player;
  }

  const markSymbol = function(pos, cell) {
    if (board[pos[0]][pos[1]] !== null) {
      return;
    }

    board[pos[0]][pos[1]] = currentTurnPlayer.getSymbol();
    cell.textContent = `${currentTurnPlayer.getSymbol()}`;
    checkGameEnd();
    currentTurnPlayer = currentTurnPlayer === player1 ? player2 : player1;
  }

  const checkWinner = function(symbol) {
    if (symbol === player1.getSymbol()) {
      return player1;
    }
    return player2;
  };

  const checkGameEnd = function() {
    // 가로, 세로 검사
    for (let i = 0; i < board.length; i++) {
      if ((board[i][0] !== null && board[i][1] !== null && board[i][2] !== null) &&
          (board[i][0] === board[i][1] && board[i][1] === board[i][2])) {
        setPlayerWhowin(checkWinner(board[i][0]));
        finalResult.textContent = `${playerWhoWin} 승리!`;
        return;
      }

      if ((board[0][i] !== null && board[1][i] !== null && board[2][i] !== null) &&
          (board[0][i] === board[1][i] && board[1][i] === board[2][i])) {
        setPlayerWhowin(checkWinner(board[0][i]));
        finalResult.textContent = `${playerWhoWin} 승리!`;
        return;
      }
    }

    // 대각선 검사
    if ((board[0][0] !== null && board[1][1] !== null && board[2][2] !== null) &&
        (board[0][0] === board[1][1] && board[1][1] === board[2][2])) {
      setPlayerWhowin(checkWinner(board[0][0]));
      finalResult.textContent = `${playerWhoWin} 승리!`;
        return;
    }

    if ((board[0][3] !== null && board[1][1] !== null && board[2][0] !== null) &&
        (board[0][3] === board[1][1] && board[1][1] === board[2][0])) {
      setPlayerWhowin(checkWinner(board[0][3]));
      finalResult.textContent = `${playerWhoWin} 승리!`;
      return;
    }

    // 무승부 체크, 한 개의 칸이라도 null이면 게임 끝 아님
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === null) {
          return;
        }
      }
    }

    // 무승부
    finalResult.textContent = "무승부";
  };

  return {
    markSymbol,
    setPlayer1,
    setPlayer2
  };
})();

// const player1Info = document.querySelector(".player-1");
// const player2Info = document.querySelector(".player-2");
// const finalResult = document.querySelector(".final-result");

// for (let i = 0; i < 9; i++) {
//   const cell = document.querySelector(`.cell-${i}`);
//   const pos = [parseInt(i / 3), i % 3];
//   cell.addEventListener("click", () => game.markSymbol(pos, cell));
// }

const player1Name = prompt("플레이어 1 이름 입력");
const player2Name = prompt("플레이어 2 이름 입력");

// player1Info.textContent = `${player1Name} -> O`;
// player2Info.textContent = `${player2Name} -> X`;
// game.setPlayer1("O", player1Name);
// game.setPlayer2("X", player2Name);