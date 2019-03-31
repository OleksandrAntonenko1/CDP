/**
 * Max default amount of points.
 * @const {number}
 */
const GAME_END_POINTS = 301;
/**
 * Max number in game.
 * @const {number}
 */
const MAX_NUMBER = 20;
/**
 * @const {number}
 */
const MAX_MULTIPLIER = 3;
/**
 * @const {number}
 */
const MIN_MULTIPLIER = 1;

/**
 * @class
 * @classdesc Game class.
 *
 * @export
 */
class Game {
  /**
   *  @param {Array<Player>} players
   *
   *  @constructs
   */
  constructor(players) {
    this.players = players;
    this.scoreBoard = this.getInitialScore(players);
    this.currentPlayer = this.players[0];
    this.firstThrow = true;
    this.turnCounter = 0;
  }

  /**
   *  @param {number} param
   *  @param {number} maxNum
   *  @param {number} minNumber
   *
   *  @return {boolean}
   */
  static checkIntegerParam(param, maxNum, minNumber = 0) {
    return (typeof param === 'number' && param >= minNumber && param <= maxNum)
  }

  /**
   *  @param {number} score
   *  @param {number} multiplier
   *
   *  @return {boolean}
   */
  static checkParams(score, multiplier) {
    const isScoreCorrect = Game.checkIntegerParam(score, MAX_NUMBER);
    const isMultiplierCorrect = Game.checkIntegerParam(multiplier, MAX_MULTIPLIER, MIN_MULTIPLIER);

    return isScoreCorrect && isMultiplierCorrect;
  }

  /**
   *  @param {number} score
   *  @param {number} multiplier
   *
   *  @return {Object}
   */
  throw(score, multiplier = 1) {
    if (!Game.checkParams(score, multiplier)) {
      throw new Error('Wrong parameters')
    }
    const points = score * multiplier;
    this.currentPlayer = this.players[this.turnCounter];
    this.scoreBoard[this.currentPlayer].throws.push(points);

    if (!this.firstThrow) {
      this.scoreBoard[this.currentPlayer].score = this.countScore(points, multiplier);
    }

    if (this.turnCounter === this.players.length - 1) {
      this.handleTurnEnd()
    } else {
      this.turnCounter++;
    }

    return {
      currentPlayer: this.currentPlayer,
      points,
      score: this.scoreBoard[this.currentPlayer].score,
    }
  };

  /**
   *  @param {number} points
   *  @param {number} multiplier
   *
   *  @return {number}
   */
  countScore(points, multiplier) {
    const {score} = this.scoreBoard[this.currentPlayer];
    const result = score - points;

    if (result === 0 && multiplier > 1) {
      return 0
    } else if (result <= 1 || (result === 0 && multiplier === 1)) {
      return score
    } else {
      return result;
    }
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
      scoreBoard[player] = {score: GAME_END_POINTS, throws: []}
    });

    return scoreBoard;
  }
}
