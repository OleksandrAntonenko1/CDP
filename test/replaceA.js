import {expect} from "chai"
import {countElems} from '../index'

describe('countElems', function () {
    const result = {
        a: 3,
        A: 3,
        c: 2,
        b: 1,
    };

    const string = 'aaaAcAcbA';
    it('should be string', () => {
        expect(countElems(string)).to.be.an('string');
    });

    it(`should count all characters in ${string}`, () => {
        expect(JSON.parse(countElems(string))).to.deep.equal(result);
    });

    it('should count all characters in "" ', () => {
        expect(countElems('')).to.equal('{}');
    });
});