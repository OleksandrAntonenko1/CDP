import {Game} from '../src/Game';
import {describe} from "mocha";
import {should} from "chai";

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


});