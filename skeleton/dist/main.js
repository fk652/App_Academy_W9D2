/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const View = __webpack_require__(/*! ./ttt-view */ \"./src/ttt-view.js\");// require appropriate file\nconst Game = __webpack_require__(/*! ../ttt_node/game */ \"./ttt_node/game.js\");// require appropriate file\n\n// import View from \"./ttt-view\";\n// import Game from \"./game\";\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  // Your code here\n  const game = new Game();\n  console.log(game);\n  console.log(game.currentPlayer);\n  const ticTacToeBoard = document.getElementsByClassName('ttt')[0];\n  const view = new View(game, ticTacToeBoard);\n  console.log(view);\n  console.log(view.game);\n  \n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/ttt-view.js":
/*!*************************!*\
  !*** ./src/ttt-view.js ***!
  \*************************/
/***/ ((module) => {

eval("class View {\n  constructor(game, el) {\n    console.log(el);\n    this.game = game;\n    this.htmlElement = el;\n    this.setupBoard();\n    this.bindEvents();\n  }\n\n  setupBoard() {\n    const ul = document.createElement('ul');\n    ul.setAttribute(\"id\", \"grid\");\n    ul.style.display = \"flex\";\n    ul.style.width = \"600px\";\n    ul.style.flexWrap = \"wrap\";\n    ul.style.listStyleType = 'none';\n    ul.style.margin = '0px auto';\n    const inactiveColor = '#e0e0e0';\n\n    for (let i = 0; i < 3; i++){\n      for (let j = 0; j < 3; j++){\n        const li = document.createElement('li');\n        li.style.width = '190px';\n        li.style.height = '190px';\n        li.style.border = '1px solid black';\n        li.style.background = inactiveColor;\n        li.setAttribute('data-pos',`[${i},${j}]`);\n        ul.appendChild(li);\n      }\n    }\n\n    this.htmlElement.appendChild(ul);\n  }\n  \n  bindEvents() {\n    const ul = document.getElementById(\"grid\");\n    const inactiveColor = '#e0e0e0';\n    \n    ul.addEventListener(\n      'click',\n      this.handleClick.bind(this)\n    );\n\n    ul.addEventListener(\n      'mouseover',\n      (event) => {\n        //console.log(event.target.className);\n        // console.log(this.game.currentPlayer);\n        // console.log(event.target.tagName);\n        // console.log(event.target.getAttribute('data-pos'));\n        // console.log(event.target.getAttribute('data-pos') instanceof Array);\n        // console.log(event.target.getAttribute('data-pos') instanceof String);\n        // console.log(typeof event.target.getAttribute('data-pos'));\n        // console.log(event.target.getAttribute('data-pos')[0])\n        // let pos = event.target.getAttribute('data-pos');\n        // pos = pos.slice(1, pos.length-1).split(',').map((el) => parseInt(el));\n        // console.log(pos);\n        // event.target.setAttribute(\"class\", `${this.game.currentPlayer}`)\n\n\n        if (event.target.className === '' && event.target.tagName === \"LI\"){\n          event.target.style.background = 'yellow';\n        } \n        // setTimeout(() => {\n        //   event.target.style.background = inactiveColor;\n        // },\n        // 500\n        // )\n      }\n    );\n\n    ul.addEventListener(\n      'mouseout',\n      (event) => {\n        if (event.target.tagName === \"LI\") {\n          if (event.target.className === ''){\n            event.target.style.background = inactiveColor;\n          } else {\n            event.target.style.background = 'white';\n          }\n        }\n      }\n    );\n  }\n\n  handleClick(e) {\n\n    if (e.target.className === '' \n        && e.target.tagName === \"LI\"\n        && !this.game.isOver()) {\n      let pos = e.target.getAttribute('data-pos');\n      pos = pos.slice(1, pos.length-1).split(',').map((el) => parseInt(el));\n      // console.log(this.game);\n      try {\n        const currentMark = this.game.currentPlayer;\n        this.game.playMove(pos);\n        e.target.setAttribute(\"class\", `${currentMark}`);\n        \n        if (this.game.isOver()) {\n          const winner = this.game.winner();\n          let winnerName;\n          winner === 'x' \n            ? winnerName = 'CAT' \n            : winner === 'o' \n              ? winnerName = 'CAPYBARA CAPYBARA CAPYBARA ????'\n              : winnerName = '';\n          const gameOverMessage = document.createElement('figcaption');\n          if (winner === null) {\n            gameOverMessage.innerText = `Draw, no winners`;\n            gameOverMessage.style.color = 'red';\n          } else {\n            gameOverMessage.innerText = `You win, ${winnerName}`;\n            gameOverMessage.style.color = 'green';\n          }\n          // this.htmlElement.appendChild(gameOverMessage);    \n          this.htmlElement.prepend(gameOverMessage);      \n        }\n      } catch (error) {\n        console.error(error);\n      }\n    }\n  }\n\n  makeMove(square) {}\n\n}\n\nmodule.exports = View;\n\n\n//# sourceURL=webpack:///./src/ttt-view.js?");

/***/ }),

/***/ "./ttt_node/board.js":
/*!***************************!*\
  !*** ./ttt_node/board.js ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MoveError = __webpack_require__(/*! ./moveError */ \"./ttt_node/moveError.js\");\n\nclass Board {\n  constructor() {\n    this.grid = Board.makeGrid();\n  }\n\n  isEmptyPos(pos) {\n    if (!Board.isValidPos(pos)) {\n      throw new MoveError('Is not valid position!');\n    }\n\n    return (this.grid[pos[0]][pos[1]] === null);\n  }\n\n  isOver() {\n    if (this.winner() != null) {\n      return true;\n    }\n\n    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {\n      for (let colIdx = 0; colIdx < 3; colIdx++) {\n        if (this.isEmptyPos([rowIdx, colIdx])) {\n          return false;\n        }\n      }\n    }\n\n    return true;\n  }\n\n  placeMark(pos, mark) {\n    if (!this.isEmptyPos(pos)) {\n      throw new MoveError('Is not an empty position!');\n    }\n\n    this.grid[pos[0]][pos[1]] = mark;\n  }\n\n  print() {\n    const strs = [];\n    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {\n      const marks = [];\n      for (let colIdx = 0; colIdx < 3; colIdx++) {\n        marks.push(\n          this.grid[rowIdx][colIdx] ? this.grid[rowIdx][colIdx] : \" \"\n        );\n      }\n      strs.push(`${marks.join('|')}\\n`);\n    }\n\n    console.log(strs.join('-----\\n'));\n  }\n\n  winner() {\n    const posSeqs = [\n      // horizontals\n      [[0, 0], [0, 1], [0, 2]],\n      [[1, 0], [1, 1], [1, 2]],\n      [[2, 0], [2, 1], [2, 2]],\n      // verticals\n      [[0, 0], [1, 0], [2, 0]],\n      [[0, 1], [1, 1], [2, 1]],\n      [[0, 2], [1, 2], [2, 2]],\n      // diagonals\n      [[0, 0], [1, 1], [2, 2]],\n      [[2, 0], [1, 1], [0, 2]]\n    ];\n\n    for (let i = 0; i < posSeqs.length; i++) {\n      const winner = this.winnerHelper(posSeqs[i]);\n      if (winner != null) {\n        return winner;\n      }\n    }\n\n    return null;\n  }\n\n  winnerHelper(posSeq) {\n    for (let markIdx = 0; markIdx < Board.marks.length; markIdx++) {\n      const targetMark = Board.marks[markIdx];\n      let winner = true;\n      for (let posIdx = 0; posIdx < 3; posIdx++) {\n        const pos = posSeq[posIdx];\n        const mark = this.grid[pos[0]][pos[1]];\n\n        if (mark != targetMark) {\n          winner = false;\n        }\n      }\n\n      if (winner) {\n        return targetMark;\n      }\n    }\n\n    return null;\n  }\n\n  static isValidPos(pos) {\n    return (0 <= pos[0]) &&\n    (pos[0] < 3) &&\n    (0 <= pos[1]) &&\n    (pos[1] < 3);\n  }\n\n  static makeGrid() {\n    const grid = [];\n\n    for (let i = 0; i < 3; i++) {\n      grid.push([]);\n      for (let j = 0; j < 3; j++) {\n        grid[i].push(null);\n      }\n    }\n\n    return grid;\n  }\n}\n\nBoard.marks = ['x', 'o'];\n\nmodule.exports = Board;\n\n\n//# sourceURL=webpack:///./ttt_node/board.js?");

/***/ }),

/***/ "./ttt_node/game.js":
/*!**************************!*\
  !*** ./ttt_node/game.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Board = __webpack_require__(/*! ./board */ \"./ttt_node/board.js\");\nconst MoveError = __webpack_require__(/*! ./moveError */ \"./ttt_node/moveError.js\");\n\nclass Game {\n  constructor() {\n    this.board = new Board();\n    this.currentPlayer = Board.marks[0];\n  }\n\n  isOver() {\n    return this.board.isOver();\n  }\n\n  playMove(pos) {\n    this.board.placeMark(pos, this.currentPlayer);\n    this.swapTurn();\n  }\n\n  promptMove(reader, callback) {\n    const game = this;\n\n    this.board.print();\n    console.log(`Current Turn: ${this.currentPlayer}`);\n\n    reader.question('Enter rowIdx: ', rowIdxStr => {\n      const rowIdx = parseInt(rowIdxStr);\n      reader.question('Enter colIdx: ', colIdxStr => {\n        const colIdx = parseInt(colIdxStr);\n        callback([rowIdx, colIdx]);\n      });\n    });\n  }\n\n  run(reader, gameCompletionCallback) {\n    this.promptMove(reader, move => {\n      try {\n        this.playMove(move);\n      } catch (e) {\n        if (e instanceof MoveError) {\n          console.log(e.msg);\n        } else {\n          throw e;\n        }\n      }\n\n      if (this.isOver()) {\n        this.board.print();\n        if (this.winner()) {\n          console.log(`${this.winner()} has won!`);\n        } else {\n          console.log('NO ONE WINS!');\n        }\n        gameCompletionCallback();\n      } else {\n        // continue loop\n        this.run(reader, gameCompletionCallback);\n      }\n    });\n  }\n\n  swapTurn() {\n    if (this.currentPlayer === Board.marks[0]) {\n      this.currentPlayer = Board.marks[1];\n    } else {\n      this.currentPlayer = Board.marks[0];\n    }\n  }\n\n  winner() {\n    return this.board.winner();\n  }\n}\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack:///./ttt_node/game.js?");

/***/ }),

/***/ "./ttt_node/moveError.js":
/*!*******************************!*\
  !*** ./ttt_node/moveError.js ***!
  \*******************************/
/***/ ((module) => {

eval("\nconst MoveError = function (msg) { this.msg = msg; };\n\n// MoveError really should be a child class of the built in Error object provided\n// by Javascript, but since we haven't covered inheritance yet, we'll just\n// let it be a vanilla Object for now!\n\nmodule.exports = MoveError;\n\n\n//# sourceURL=webpack:///./ttt_node/moveError.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;