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

    for (let i = 0; i < 3; i++){
      for (let j = 0; j < 3; j++){
        const li = document.createElement('li');
        li.style.width = '90px';
        li.style.height = '90px';
        li.style.border = '1px solid black';
        const inactiveColor = '#e0e0e0';
        li.style.background = inactiveColor;
        li.setAttribute('data-pos',`[${i},${j}]`);
        li.addEventListener(
          'mouseover',
          (event) => {
            //console.log(event.target.className);
            if (event.target.className === ''){
              event.target.style.background = 'yellow';
            } 
            // setTimeout(() => {
            //   event.target.style.background = inactiveColor;
            // },
            // 500
            // )
          }
        );

        li.addEventListener(
          'mouseout',
          (event) => {
            if (event.target.className === ''){
              event.target.style.background = inactiveColor;
            } else {
              event.target.style.background = 'white';
            }
          }
        );
        
        
        ul.appendChild(li);
      }
    }
    this.htmlElement.appendChild(ul);

  }
  
  bindEvents() {}

  handleClick(e) {}

  makeMove(square) {}

}

module.exports = View;
