import {Game} from '../src/Game';
import {describe} from "mocha";
import {
    should,
    expect,
    to,
} from "chai";

const PLAYERS = [
    'Karl',
    'Mark',
    'Sean',
];

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
                game.score().should.equal(301);
            });

            it("should shuffle players turns", () => {
                const shuffledPlayers = [
                    'Sean',
                    'Karl',
                    'Mark',
                ];
                game.throw(7);
                game.throw(3);
                game.throw(8);
                game.players.should.deep.equal(shuffledPlayers);
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

            describe('throw after players shuffle,  with default multiplier', () => {
                beforeEach(() => {
                    game.throw(1);
                    game.throw(1);
                    game.throw(1);
                    game.throw(1);
                });

                it("should handle one with one point", () => {
                    game.score().should.equal(300);
                });

                it("should save points for the first player", () => {
                    game.scoreBoard[PLAYERS[0]].score.should.equal(300);
                });
            });

            describe('throw after players shuffle,  with double multiplier', () => {
                beforeEach(() => {
                    game.throw(1);
                    game.throw(1);
                    game.throw(1);
                    game.throw(3, 2);
                });

                it("should handle throw", () => {
                    game.score().should.equal(301 - 6);
                });

                it("should save points for the first player", () => {
                    game.scoreBoard[PLAYERS[0]].score.should.equal(301 - 6);
                });
            });

            describe('throw after players shuffle,  with triple multiplier', () => {
                beforeEach(() => {
                    game.throw(1);
                    game.throw(1);
                    game.throw(1);
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
                    expect(() =>  game.throw(10, 4)).to.throw();
                });

                it("should handle throw with multiplier less than it should be", () => {
                    expect(() => game.throw(10, 0)).to.throw();
                });

                it("should handle throw with max score", () => {
                    expect(() => game.throw(20, 3)).not.to.throw();
                });

                it("should handle throw with min score", () => {
                    expect(() => game.throw(0, 1)).not.to.throw();
                });
            });
        })
    })
});