export class Game {
    constructor(players = []) {
        this.GAME_END_POINTS = 301;
        this.MAX_NUMBER = 20;
        this.MAX_MULTIPLIER = 3;
        this.MIN_MULTIPLIER = 1;
        this.GAME_END_POINTS = 301;
        this.players = players;
        this.scoreBoard = this.getInitialScore(players);
        this.currentPlayer = this.players[0];
        this.firstThrow = true;
        this.turnCounter = 0;
    }

    static checkIntegerParam(param, maxNum, minNumber = 0) {
        return (typeof param === 'number' && param >= minNumber && param <= maxNum)
    }

    throw(score, multiplier = 1) {
        if (!this.checkParams(score, multiplier)) {
            throw new Error('Wrong parameters')
        }
        const points = score * multiplier;
        this.currentPlayer = this.players[this.turnCounter];
        this.scoreBoard[this.currentPlayer].throws.push(points);

        if (!this.firstThrow) {
            this.scoreBoard[this.currentPlayer].score -= points;
        }

        if (this.turnCounter === this.players.length - 1) {
            this.handleTurnEnd()
        } else {
            this.turnCounter++;
        }
    };

    checkParams(score, multiplier) {
        const isScoreCorrect = Game.checkIntegerParam(score, this.MAX_NUMBER);
        const isMultiplierCorrect = Game.checkIntegerParam(multiplier, this.MAX_MULTIPLIER, this.MIN_MULTIPLIER);

        return isScoreCorrect && isMultiplierCorrect;
    }

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
        return this.scoreBoard[this.currentPlayer].score;
    }

    getScoreBoard() {
        return Object.keys(this.scoreBoard).map((name) => ({[name]: this.scoreBoard[name].score}));
    }

    getInitialScore(players) {
        const scoreBoard = {};

        players.forEach((player) => {
            scoreBoard[player] = {score: this.GAME_END_POINTS, throws: []}
        });

        return scoreBoard;
    }
}