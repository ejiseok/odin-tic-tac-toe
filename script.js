const Player = function(symbol) {
  const _symbol = symbol;

  const getSymbol = function() {
    return _symbol;
  }

  return {
    getSymbol
  };
};

const game = (function() {
  const player1 = Player("O");
  const player2 = Player("X");
  const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];

  let currentTurnPlayer = player1;
  let playerWhoWin = null;

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
    checkGameEnd
  };
})();

const player1Info = document.querySelector(".player-1");
const player2Info = document.querySelector(".player-2");
const finalResult = document.querySelector(".final-result");

for (let i = 0; i < 9; i++) {
  const cell = document.querySelector(`.cell-${i}`);
  const pos = [parseInt(i / 3), i % 3];
  cell.addEventListener("click", () => game.markSymbol(pos, cell));
}