export const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

export const makeThrows = (game, amount, value, multiplier = 1) => {
    for (let i = 0; i < amount; i++) {
        game.throw(value, multiplier)
    }
};