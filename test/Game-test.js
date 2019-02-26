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

    describe('game', () =>{
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
    })
});