import {describe} from "mocha";
import {
    should,
    expect,
    to,
} from "chai";

import {Game} from '../src/Game';
import {GAME_END_POINTS} from '../src/constants';
import {
    makeThrows,
    getRandomInt,
} from './helpers/helpers'

const PLAYERS = [
    'Karl',
    'Mark',
    'Sean',
];

const shuffledPlayers = {
    players: [
        'Sean',
        'Karl',
        'Mark',
    ],
    throws: [7, 3, 8]
};

describe("Game", () => {
    describe("clean game", () => {
        let game;

        beforeEach(() => {
            game = new Game();
        });

        it("should exist", () => {
            should().exist(game);
        });

        it("should have a method throw", () => {
            should().exist(game.throw);
        });

        it("should have a method score", () => {
            should().exist(game.score);
        });
    });

    describe('game', () => {
        let game;

        beforeEach(() => {
            game = new Game(PLAYERS);
        });

        it("should have names of players", () => {
            should().exist(game.players);
        });

        it("should save proper names of players", () => {
            game.players.should.equal(PLAYERS)
        });

        describe('first throw', () => {
            it("should not be in the score", () => {
                game.throw(7);
                game.score().should.equal(GAME_END_POINTS);
            });

            it("should shuffle players turns", () => {
                for (let i of shuffledPlayers.throws) {
                    game.throw(i)
                }

                game.players.should.deep.equal(shuffledPlayers.players);
            });
        });

        describe('score', () => {
            it("should exist", () => {
                should().exist(game.score);
            });

            it("should return default amount of points", () => {
                game.score().should.equal(GAME_END_POINTS);
            });
        });

        describe('getScoreBoard', () => {
            it("should exist", () => {
                should().exist(game.getScoreBoard);
            });

            it("should return default value for players", () => {
                game.getScoreBoard().should.deep.equal(PLAYERS.map(name => ({[name]: GAME_END_POINTS})));
            });

            it("should return proper value for throwing all 1", () => {
                const points = 1;

                makeThrows(game, 6, points);
                game.getScoreBoard().should.deep.equal(PLAYERS.map(
                    name => ({[name]: GAME_END_POINTS - points}))
                );
            });
        });

        describe('throw', () => {
            it("should exist", () => {
                should().exist(game.throw);
            });

            it("should handle clear one, with default multiplier", () => {
                game.throw(0);
                game.score().should.equal(301);
            });

            it("should handle throw with max score", () => {
                expect(() => game.throw(20, 3)).not.to.throw();
            });

            it("should handle throw with min score", () => {
                expect(() => game.throw(0, 1)).not.to.throw();
            });

            describe('throw after players shuffle,  with default multiplier', () => {
                const points = 1;

                beforeEach(() => {
                    makeThrows(game, 4, points);
                });

                it("should handle one with one point", () => {
                    game.score().should.equal(GAME_END_POINTS - points);
                });

                it("should save points for the first player", () => {
                    game.scoreBoard[PLAYERS[0]].score.should.equal(GAME_END_POINTS - points);
                });
            });

            describe('throw after players shuffle,  with double multiplier', () => {
                let points;

                beforeEach(() => {
                    const field = 3;
                    const multiplier = 2;

                    makeThrows(game, 3, 1);
                    game.throw(field, multiplier);
                    points = field * multiplier;
                });

                it("should handle throw", () => {
                    game.score().should.equal(GAME_END_POINTS - points);
                });

                it("should save points for the first player", () => {
                    game.scoreBoard[PLAYERS[0]].score.should.equal(GAME_END_POINTS - points);
                });
            });

            describe('throw after players shuffle,  with triple multiplier', () => {
                beforeEach(() => {
                    makeThrows(game, 3, 1);
                    game.throw(3, 3);
                });

                it("should handle throw", () => {
                    game.score().should.equal(301 - 9);
                });

                it("should save points for the first player", () => {
                    game.scoreBoard[PLAYERS[0]].score.should.equal(301 - 9);
                });
            });

            describe('throw with wrong parameters', () => {
                it("should handle throw with string parameter", () => {
                    expect(() => game.throw('1')).to.throw();
                });

                it("should handle throw with score bigger than it should be", () => {
                    expect(() => game.throw(21)).to.throw();
                });

                it("should handle throw with score less than it should be", () => {
                    expect(() => game.throw(-1)).to.throw();
                });

                it("should handle throw with multiplier bigger than it should be", () => {
                    expect(() => game.throw(10, 4)).to.throw();
                });

                it("should handle throw with multiplier less than it should be", () => {
                    expect(() => game.throw(10, 0)).to.throw();
                });
            });
        })
    });

    describe('late game', () => {
        let game;

        beforeEach(() => {
            game = new Game(PLAYERS);
            makeThrows(game, 15, 20, 3);
            makeThrows(game, 3, 20, 2);
        });

        it('should have proper Score Board', () => {
            game.getScoreBoard().should.deep.equal(PLAYERS.map(name => ({[name]: 21})));
        });

        it('should end', () => {
            game.throw(7, 3);
            game.score().should.equal(0)
        });

        describe('should have the same value', () => {
            it('points > score', () => {
                game.throw(20, 2);
                game.score().should.equal(21)
            });

            it('multiplier = 1', () => {
                for (let i = 0; i < 3; i++) {
                    game.throw(1, 1);
                }
                game.throw(20, 1);
                game.score().should.equal(20)
            });

            it('score = 1', () => {
                game.throw(20, 1);
                game.score().should.equal(21)
            });
        });
    });

    describe('full game', () => {
        let game;
        let result = {};

        beforeEach(() => {
            game = new Game(PLAYERS);

            do {
                result = game.throw(getRandomInt(0, 21), getRandomInt(1, 4));
            } while (result.score !== 0)
        });

        it('should end', () => {
            result.score.should.equal(0);
        })
    });
});