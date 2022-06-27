const fourInARow = new FourInARow();
fourInARow.start();

function FourInARow() {
    const board = new Board();
    const humanXPlayer = new HumanXPlayer(board);
    const humanOPlayer = new HumanOPlayer(board);
    let turn = 0;

    this.start = function() {
        const config = { childList: true};
        const observer = new MutationObserver(() => takeTurn());
        board.positions.forEach((el) => observer.observe(el, config));
        takeTurn();
    }


function takeTurn() {
    if (board.checkForWinner()) {
        return;  
    }
    if (turn % 2 === 0) {
        humanXPlayer.takeTurn();
        const messages = document.querySelector('h3')
        messages.innerHTML = `Your turn: <img src="https://as2.ftcdn.net/jpg/02/06/83/59/160_F_206835994_J1Mzs3QSVFBCgzNUmBDPno499m1q9DfJ.jpg" alt="asteroid" width="80px" height="80" style= "border-radius:50%">`; 
    } else {
        humanOPlayer.takeTurn();
        const messages = document.querySelector('h3')
        messages.innerHTML = `Your turn: <img src="https://images6.alphacoders.com/533/thumb-1920-533402.png" alt="comet" width="80px" height="80" style="transform: scaleX(-1)">`; 
    }

    turn++;
    
    if (turn === 37) {
        const messages = document.querySelector('h3')
        messages.innerHTML = `It's a draw!!! <img src="https://thumbs.dreamstime.com/b/fire-ice-abstract-background-red-blue-smoke-swirl-dark-background-59428437.jpg" alt="asteroid and comet swirl" width="80px" height="80">`;
    }
}

function Board() {
    this.positions = Array.from(document.querySelectorAll('.cell'));
    this.checkForWinner = function() {
        let winner = false;
        const winningCombinations = [
            [0,1,2,3],
            [1,2,3,4],
            [2,3,4,5],
            [6,7,8,9],
            [7,8,9,10],
            [8,9,10,11],
            [12,13,14,15],
            [13,14,15,16],
            [14,15,16,17],
            [18,19,20,21],
            [19,20,21,22],
            [20,21,22,23],
            [24,25,26,27],
            [25,26,27,28],
            [26,27,28,29],
            [30,31,32,33],
            [31,32,33,34],
            [32,33,34,35],
            [0,6,12,18],
            [6,12,18,24],
            [12,18,24,30],
            [1,7,13,19],
            [7,13,19,25],
            [13,19,25,31],
            [2,8,14,20],
            [8,14,20,26],
            [14,20,26,32],
            [3,9,15,21],
            [9,15,21,27],
            [15,21,27,33],
            [4,10,16,22],
            [10,16,22,28],
            [16,22,28,34],
            [5,11,17,23],
            [11,17,23,29],
            [17,23,29,35],
            [0,7,14,21],
            [1,8,15,22],
            [2,9,16,23],
            [3,8,13,18],
            [4,9,14,19],
            [5,10,15,20],
            [6,13,20,27],
            [7,14,21,28],
            [8,15,22,29],
            [9,14,19,24],
            [10,15,20,25],
            [11,16,21,26],
            [12,19,26,33],
            [13,20,27,34],
            [14,21,28,35],
            [15,20,25,30],
            [16,21,26,31],
            [17,22,27,32]
        ];
        const positions = this.positions;

        winningCombinations.forEach((winningCombo) => {
            const pos0InnerText = positions[winningCombo[0]].innerHTML;
            const pos1InnerText = positions[winningCombo[1]].innerHTML;
            const pos2InnerText = positions[winningCombo[2]].innerHTML;
            const pos3InnerText = positions[winningCombo[3]].innerHTML;
            const isWinningCombo = pos0InnerText !== '' &&
                pos0InnerText === pos1InnerText &&
                pos1InnerText === pos2InnerText && 
                pos2InnerText === pos3InnerText;

                if (isWinningCombo) {
                    winner = true;
                    winningCombo.forEach((index) => {
                        positions[index].className += ' winner';
                        const messages = document.querySelector('h3')
                        if (turn % 2 !== 0) {
                        messages.innerHTML = `<img src="https://as2.ftcdn.net/jpg/02/06/83/59/160_F_206835994_J1Mzs3QSVFBCgzNUmBDPno499m1q9DfJ.jpg" alt="asteroid" width="90px" height="90px" style= "border-radius:50%"> is the winner!!!`; 
                        } else {messages.innerHTML = `<img src="https://images6.alphacoders.com/533/thumb-1920-533402.png" alt="comet" width="90px" height="90" style="transform: scaleX(-1)"> is the winner!!!`}
                    })
                }
        });
        return winner;
            }
    }
    
function HumanXPlayer(board) {
    this.takeTurn = function() {
        board.positions.forEach(el => {
            if (el.innerHTML === '') {
            el.addEventListener('click', handleTurnTaken)
        }
        });
    
    }
    function handleTurnTaken(event) {
        event.target.innerHTML = `<img src="https://as2.ftcdn.net/jpg/02/06/83/59/160_F_206835994_J1Mzs3QSVFBCgzNUmBDPno499m1q9DfJ.jpg" alt="asteroid" width="80px" height="80" style= "border-radius:50%">`;

        board.positions.forEach(el => el.removeEventListener('click', handleTurnTaken));
    }
}

function HumanOPlayer(board) {
    this.takeTurn = function() {
        board.positions.forEach(el => {
            if (el.innerHTML === '') {
                el.addEventListener('click', handleTurnTaken)
            }
        });
    }
    function handleTurnTaken(event) {
        event.target.innerHTML = `<img src="https://images6.alphacoders.com/533/thumb-1920-533402.png" alt="comet" width="80px" height="80" style="transform: scaleX(-1)">`; 
        board.positions.forEach(el => el.removeEventListener('click', handleTurnTaken)); 
}
}

startReset.addEventListener('click', function (event){
    location.reload()
 })
}