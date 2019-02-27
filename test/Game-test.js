import {Game} from '../src/Game';
import {describe} from "mocha";
import {should} from "chai";

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

            describe('throw after players shuffle', () => {
                beforeEach(() => {
                    game.throw(1);
                    game.throw(1);
                    game.throw(1);
                    game.throw(1);
                });

                it("should handle one with one point, with default multiplier", () => {
                    game.score().should.equal(300);
                });

                it("should save points for the first player", () => {
                    game.scoreBoard[PLAYERS[0]].score.should.equal(300);
                });
            });
        })
    })
});