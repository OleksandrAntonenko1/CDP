/**
 * Enum for League.
 * @enum {number}
 *
 * @export
 */
const League = {
  PRO: 2,
  SEMI: 1,
  AMA: 0
};
/**
 * @class
 * @classdesc Player class.
 *
 * @export
 */
class Player {
  /**
   *  @param {string} id
   *  @param {string} fullName
   *  @param {League} league
   *
   *  @constructs
   *
   */
  constructor(id, fullName, league) {
    this.id = id;
    this.fullName = fullName;
    this.league = league;
  }
}
