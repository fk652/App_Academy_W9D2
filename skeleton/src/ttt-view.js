class View {
  constructor(game, el) {
    console.log(el);
    this.game = game;
    this.htmlElement = el;
    this.setupBoard();
    this.bindEvents();
  }

  setupBoard() {
    const ul = document.createElement('ul');
    ul.setAttribute("id", "grid");
    ul.style.display = "flex";
    ul.style.width = "600px";
    ul.style.flexWrap = "wrap";
    ul.style.listStyleType = 'none';
    ul.style.margin = '0px auto';
    const inactiveColor = '#e0e0e0';

    for (let i = 0; i < 3; i++){
      for (let j = 0; j < 3; j++){
        const li = document.createElement('li');
        li.style.width = '190px';
        li.style.height = '190px';
        li.style.border = '1px solid black';
        li.style.background = inactiveColor;
        li.setAttribute('data-pos',`[${i},${j}]`);
        ul.appendChild(li);
      }
    }

    this.htmlElement.appendChild(ul);
  }
  
  bindEvents() {
    const ul = document.getElementById("grid");
    const inactiveColor = '#e0e0e0';
    
    ul.addEventListener(
      'click',
      this.handleClick.bind(this)
    );

    ul.addEventListener(
      'mouseover',
      (event) => {
        //console.log(event.target.className);
        // console.log(this.game.currentPlayer);
        // console.log(event.target.tagName);
        // console.log(event.target.getAttribute('data-pos'));
        // console.log(event.target.getAttribute('data-pos') instanceof Array);
        // console.log(event.target.getAttribute('data-pos') instanceof String);
        // console.log(typeof event.target.getAttribute('data-pos'));
        // console.log(event.target.getAttribute('data-pos')[0])
        // let pos = event.target.getAttribute('data-pos');
        // pos = pos.slice(1, pos.length-1).split(',').map((el) => parseInt(el));
        // console.log(pos);
        // event.target.setAttribute("class", `${this.game.currentPlayer}`)


        if (event.target.className === '' && event.target.tagName === "LI"){
          event.target.style.background = 'yellow';
        } 
        // setTimeout(() => {
        //   event.target.style.background = inactiveColor;
        // },
        // 500
        // )
      }
    );

    ul.addEventListener(
      'mouseout',
      (event) => {
        if (event.target.tagName === "LI") {
          if (event.target.className === ''){
            event.target.style.background = inactiveColor;
          } else {
            event.target.style.background = 'white';
          }
        }
      }
    );
  }

  handleClick(e) {

    if (e.target.className === '' 
        && e.target.tagName === "LI"
        && !this.game.isOver()) {
      let pos = e.target.getAttribute('data-pos');
      pos = pos.slice(1, pos.length-1).split(',').map((el) => parseInt(el));
      // console.log(this.game);
      try {
        const currentMark = this.game.currentPlayer;
        this.game.playMove(pos);
        e.target.setAttribute("class", `${currentMark}`);
        
        if (this.game.isOver()) {
          const winner = this.game.winner();
          let winnerName;
          winner === 'x' 
            ? winnerName = 'CAT' 
            : winner === 'o' 
              ? winnerName = 'CAPYBARA CAPYBARA CAPYBARA 😊'
              : winnerName = '';
          const gameOverMessage = document.createElement('figcaption');
          if (winner === null) {
            gameOverMessage.innerText = `Draw, no winners`;
            gameOverMessage.style.color = 'red';
          } else {
            gameOverMessage.innerText = `You win, ${winnerName}`;
            gameOverMessage.style.color = 'green';
          }
          // this.htmlElement.appendChild(gameOverMessage);    
          this.htmlElement.prepend(gameOverMessage);      
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  makeMove(square) {}

}

module.exports = View;
