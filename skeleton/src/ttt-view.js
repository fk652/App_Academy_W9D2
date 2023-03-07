class View {
  constructor(game, el) {
    console.log(el);
    this.game = game;
    this.htmlElement = el;
    this.setupBoard();
  }

  setupBoard() {
    const ul = document.createElement('ul');
    ul.style.display = "flex";
    ul.style.width = "300px";
    ul.style.flexWrap = "wrap";
    ul.style.listStyleType = 'none';
    ul.style.margin = '30px auto';
    const inactiveColor = '#e0e0e0';

    for (let i = 0; i < 3; i++){
      for (let j = 0; j < 3; j++){
        const li = document.createElement('li');
        li.style.width = '90px';
        li.style.height = '90px';
        li.style.border = '1px solid black';
        li.style.background = inactiveColor;
        li.setAttribute('data-pos',`[${i},${j}]`);
        ul.appendChild(li);
      }
    }


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

    this.htmlElement.appendChild(ul);
  }
  
  bindEvents() {

  }

  handleClick(e) {
    if (e.target.className === '' && e.target.tagName === "LI") {
      let pos = e.target.getAttribute('data-pos');
      pos = pos.slice(1, pos.length-1).split(',').map((el) => parseInt(el));
      
      const currentMark = this.game.currentPlayer;
      this.game.playMove(pos);
      e.target.setAttribute("class", `${currentMark}`);

      if (this.game.isOver()) {
        
      }
    }
  }

  makeMove(square) {}

}

module.exports = View;
