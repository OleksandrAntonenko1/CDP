const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

const PLAYERS = [
  new Player('1', 'Karl', League.PRO),
  new Player('2', 'Mark', League.AMA),
  new Player('3', 'Sean', League.PRO),
  new Player('4', 'Jeffrey', League.AMA),
  new Player('5', 'Alex', League.SEMI),
  new Player('6', 'Max', League.SEMI),
  new Player('7', 'Chandler', League.PRO),
  new Player('8', 'Phoebe', League.SEMI),
  new Player('9', 'Monika', League.PRO),
];

const game = new Game(PLAYERS);
for (let i = 0; i < 10; i++) {
  PLAYERS.forEach((player) => {
    game.throw(player.id, getRandomInt(0, 20), getRandomInt(1, 3))
  })
}
console.log(game.score('2'));
console.log(game.getLeaders());
