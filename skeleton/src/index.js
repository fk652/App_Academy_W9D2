const View = require('./ttt-view');// require appropriate file
const Game = require('../ttt_node/game');// require appropriate file

// import View from "./ttt-view";
// import Game from "./game";

document.addEventListener("DOMContentLoaded", () => {
  // Your code here
  const game = new Game();
  console.log(game);
  console.log(game.currentPlayer);
  const ticTacToeBoard = document.getElementsByClassName('ttt')[0];
  const view = new View(game, ticTacToeBoard);
  console.log(view);
  console.log(view.game);
  
});
