class TicTacToe {
    constructor() {
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.gameState = ['', '', '', '', '', '', '', '', ''];
        this.winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        
        this.statusDisplay = document.getElementById('status');
        this.cells = document.querySelectorAll('.cell');
        this.restartButton = document.getElementById('restart');
        
        this.initializeGame();
    }

    initializeGame() {
        this.cells.forEach(cell => 
            cell.addEventListener('click', () => this.handleCellClick(cell))
        );
        this.restartButton.addEventListener('click', () => this.handleRestartGame());
    }

    handleCellClick(cell) {
        const cellIndex = parseInt(cell.getAttribute('data-cell-index'));

        if (this.gameState[cellIndex] !== '' || !this.gameActive) return;

        this.gameState[cellIndex] = this.currentPlayer;
        cell.textContent = this.currentPlayer;
        cell.classList.add(this.currentPlayer.toLowerCase());

        this.handleResultValidation();
    }

    handleResultValidation() {
        let roundWon = false;
        let winningCombo;

        for (let i = 0; i < this.winningConditions.length; i++) {
            const [a, b, c] = this.winningConditions[i];
            const position1 = this.gameState[a];
            const position2 = this.gameState[b];
            const position3 = this.gameState[c];

            if (position1 === '' || position2 === '' || position3 === '') continue;

            if (position1 === position2 && position2 === position3) {
                roundWon = true;
                winningCombo = [a, b, c];
                break;
            }
        }

        if (roundWon) {
            this.statusDisplay.textContent = `Player ${this.currentPlayer} has won!`;
            this.gameActive = false;
            this.highlightWinningCells(winningCombo);
            return;
        }

        const roundDraw = !this.gameState.includes('');
        if (roundDraw) {
            this.statusDisplay.textContent = 'Game ended in a draw!';
            this.gameActive = false;
            return;
        }

        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.statusDisplay.textContent = `Player ${this.currentPlayer}'s turn`;
    }

    highlightWinningCells(combo) {
        combo.forEach(index => {
            this.cells[index].style.backgroundColor = '#9ae6b4';
        });
    }

    handleRestartGame() {
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.gameState = ['', '', '', '', '', '', '', '', ''];
        this.statusDisplay.textContent = `Player ${this.currentPlayer}'s turn`;
        
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.style.backgroundColor = '';
            cell.classList.remove('x', 'o');
        });
    }
}

// Initialize the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});
