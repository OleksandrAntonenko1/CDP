/**
 * Max default amount of points.
 * @const {number}
 */
const GAME_END_POINTS = 301;
/**
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
    /**
     *  @member {{
     *    string: {
     *      throws: Array<number>,
     *      score: number,
     *      id: string,
     *      League, league,
     *      fullName: string,
     *  }}} scoreBoard
     */
    this.scoreBoard = this.getInitialScore(players);
    /**
     *  @member {Player} currentPlayer
     */
    this.currentPlayer = this.players[0];
    /**
     *  @member {boolean} firstThrow
     */
    this.firstThrow = true;
    /**
     *  @member {number} turnCounter
     */
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
   *  @param {string} id
   *  @param {number} score
   *  @param {number} multiplier
   *
   *  @return {Object}
   */
  throw(id, score, multiplier = 1) {
    if (!Game.checkParams(score, multiplier)) {
      throw new Error('Wrong parameters')
    }

    const points = score * multiplier;

    this.currentPlayer = this.players[this.turnCounter];
    this.scoreBoard[this.currentPlayer.id].throws.push(points);

    if (!this.firstThrow) {
      this.scoreBoard[this.currentPlayer.id].score = this.countScore(points, multiplier);
    }

    if (this.turnCounter === this.players.length - 1) {
      if (this.firstThrow) {
        this.players = this.players.sort((player1, player2) => {
          return this.scoreBoard[player2.id].throws[0] - this.scoreBoard[player1.id].throws[0];
        });
        this.firstThrow = false;
      }
      this.turnCounter = 0;
    } else {
      this.turnCounter++;
    }

    return {
      currentPlayer: this.currentPlayer,
      points,
      score: this.scoreBoard[this.currentPlayer.id].score,
    }
  };

  /**
   *  @param {number} points
   *  @param {number} multiplier
   *
   *  @return {number}
   */
  countScore(points, multiplier) {
    const {score} = this.scoreBoard[this.currentPlayer.id];
    const result = score - points;

    if (result === 0 && multiplier > 1) {
      return 0
    } else if (result <= 1 || (result === 0 && multiplier === 1)) {
      return score
    } else {
      return result;
    }
  }

  /**
   *  @param {string} id
   *
   *  @return {Array<Object>}
   */
  score(id) {
    let result;

    try {
      result = this.scoreBoard[id].score;
    } catch (e) {
      result = null
    }
    return result
  }

  /**
   *  @return {Array<Object>}
   */
  getLeaders() {
    const result = [];

    result.push(this.getFormattedScore());

    Object.values(League).forEach((league) => {
      result.push(this.getFormattedScore(league))
    });

    return result
  }

  /**
   *  @param {League|null} league
   *
   *  @return {string}
   */
  getFormattedScore(league = null) {
    const {fullName = '-', score = '-'} = this.getLeader(league) || {};

    return `${league || 'Leader'}: ${fullName} - ${score}.`
  }

  /**
   *  @param {League|null} league
   *
   *  @return {Object}
   */
  getLeader(league) {
    const data = Object.values(this.scoreBoard || {});
    const players = league
      ? data.filter((player) => player.league === league)
      : data;

    return players.sort((player1, player2) => (this.scoreBoard[player2.id].score - this.scoreBoard[player1.id].score))
      .pop()
  }

  /**
   *  @param {Array<Player>} players
   *
   *  @return {Object}
   */
  getInitialScore(players) {
    /**
     *  @type {{
     *    string: {
     *      throws: Array<number>,
     *      score: number,
     *      id: string,
     *      League, league,
     *      fullName: string,
     *  }}|Object} scoreBoard
     */
    const scoreBoard = {};

    players.forEach((player) => {
      scoreBoard[player.id] = {...player, score: GAME_END_POINTS, throws: []}
    });

    return scoreBoard;
  }
}
