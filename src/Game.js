export class Game {
    constructor(players = []) {
        this.players = players;
        this.scoreBoard = this.getInitialScore(players);
        this.currentPlayer = this.players[0];
        this.firstThrow = true;
    }

    throw(score, multiplier = 1) {
        const points = score * multiplier;
        this.scoreBoard[this.currentPlayer].throws.push(points);
        this.scoreBoard[this.currentPlayer].score += points;
    };

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