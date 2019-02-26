export class Game {
    constructor(players = []) {
        this.players = players;
        this.scoreBoard = this.getInitialScore(players);
        this.currentPlayer = this.players[0];
        this.firstThrow = true;
        this.turnCounter = 0;
    }

    throw(score, multiplier = 1) {
        const points = score * multiplier;
        this.currentPlayer = this.players[this.turnCounter];
        this.turnCounter++;
        this.scoreBoard[this.currentPlayer].throws.push(points);

        if (!this.firstThrow) {
            this.scoreBoard[this.currentPlayer].score += points;
        }

        if (this.turnCounter === this.players.length) {
            this.handleTurnEnd()
        }
    };

    handleTurnEnd() {
        if (this.firstThrow) {
            this.checkPlayersOrder();
            this.firstThrow = false;
        }
        this.turnCounter = 0;
    }

    checkPlayersOrder() {
        this.players = this.players.sort((player1, player2) => {
            return this.scoreBoard[player2].throws[0] - this.scoreBoard[player1].throws[0];
        })
    }

    score() {
        return this.scoreBoard[this.currentPlayer].score
    };

    getInitialScore(players) {
        const scoreBoard = {};

        players.forEach((player) => {
            scoreBoard[player] = {score: 0, throws: []}
        });

        return scoreBoard;
    }
}