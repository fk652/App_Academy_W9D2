const View = require('./ttt-view');// require appropriate file
const Game = require('../ttt_node/game');// require appropriate file

document.addEventListener("DOMContentLoaded", () => {
  // Your code here
  const game = new Game();
  const ticTacToeBoard = document.getElementsByClassName('ttt')[0];
  const view = new View(game, ticTacToeBoard);
});
