import {expect} from "chai"
import {lessThenAverage} from '../index'

describe('lessThenAverage', function () {
    const arrayOfNumbers = [1, 3, 5, 6, 7, 12];
    const mixedArray = [
        1,
        [],
        'ads',
        12,
        4,
        [],
        'asda',
        {},
        'aaaaaaa'
    ];

    it('should be array', () => {
        expect(lessThenAverage(arrayOfNumbers)).to.be.an('array');
    });

    it(`should find all elements that are less then average in ${arrayOfNumbers}`, () => {
        expect(lessThenAverage(arrayOfNumbers)).to.deep.equal([1, 3]);
    });

    it(`should find all elements that are less then average in ${mixedArray}`, () => {
        expect(lessThenAverage(mixedArray)).to.deep.equal([1, 'ads', 4, 'asda']);
    });

    it(`should throw an error if param is not an array`, () => {
        expect(() => lessThenAverage(42)).to.throw();
    });
});