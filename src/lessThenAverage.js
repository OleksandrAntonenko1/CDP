import {
    getAverageLength,
    getAverageNumber,
} from './helpers'

// new version 1.0.1.

export const lessThenAverage = (arr) => {
    if (!Array.isArray(arr)) {
        throw new TypeError('it is not an array')
    }

    let sum = {
        numberSum: 0,
        numberAmount: 0,
        minLength: null,
        maxLength: 0,
    };

    arr.forEach((elem) => {
        switch (typeof elem) {
            case 'number':
                sum.numberSum += elem;
                sum.numberAmount++;
                break;
            case 'string':
                const {length} = elem;
                const {
                    minLength,
                    maxLength,
                } = sum;
                if (minLength === null || length < minLength) {
                    sum.minLength = length
                } else if (length > maxLength) {
                    sum.maxLength = length
                }
                break;
        }
    });

    const average = {
        numberSum: getAverageNumber(
            sum.numberSum,
            sum.numberAmount,
        ),
        stringLength: getAverageLength(
            sum.minLength,
            sum.maxLength,
        ),
    };

    return arr.filter((elem) => {
        const {
            numberSum,
            stringLength,
        } = average;

        switch (typeof elem) {
            case 'number':
                return elem < numberSum;
            case 'string':
                const {length} = elem;
                return length < stringLength;
        }
    });
};
