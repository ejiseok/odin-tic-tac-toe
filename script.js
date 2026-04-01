const Player = function(symbol) {
  const _symbol = symbol;

  const getSymbol = function() {
    return _symbol;
  }

  return {
    getSymbol
  };
};

const Gameboard = (function() {
  const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];

  const player1 = Player("O");
  const player2 = Player("X");

  const markSymbol = function(player, pos) {
    board[pos[0]][pos[1]] = player.getSymbol();
  }

  const checkGameEnd = function() {
    // 가로, 세로 검사
    for (let i = 0; i < board.length; i++) {
      if ((board[i][0] !== null && board[i][1] !== null && board[i][2] !== null) &&
          (board[i][0] === board[i][1] && board[i][1] === board[i][2])) {
        return true;
      }

      if ((board[0][i] !== null && board[1][i] !== null && board[2][i] !== null) &&
          (board[0][i] === board[1][i] && board[1][i] === board[2][i])) {
        return true;
      }
    }

    // 대각선 검사
    if ((board[0][0] !== null && board[1][1] !== null && board[2][2] !== null) &&
        (board[0][0] === board[1][1] && board[1][1] === board[2][2])) {
      return true;
    }

    if ((board[0][3] !== null && board[1][1] !== null && board[2][0] !== null) &&
        (board[0][3] === board[1][1] && board[1][1] === board[2][0])) {
      return true;
    }

    // 무승부 체크, 한 개의 칸이라도 null이면 게임 끝 아님
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === null) {
          return false;
        }
      }
    }

    // 무승부
    return true;
  };

  return {
    markSymbol,
    checkGameEnd
  };
})();
