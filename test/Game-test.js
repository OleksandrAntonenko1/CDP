import { Game } from '../src/Game';
import {describe} from "mocha";
import {should} from "chai";

describe("Game", () => {
    let game;

    beforeEach(() => {
        game = new Game();
    });

    it("handle clean game", () => {
        should().exist(game);
    });
});