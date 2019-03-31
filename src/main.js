const PLAYERS = [
  new Player('1', 'Karl', League.PRO),
  new Player('2', 'Mark', League.AMA),
  new Player('3', 'Sean', League.PRO),
];

const game = new Game(PLAYERS);
game.throw(20, 2);
game.throw(20, 2);
game.throw(20, 2);
game.throw(20, 2);
game.throw(20, 2);
game.throw(20, 2);
console.log(game.getScoreBoard());
