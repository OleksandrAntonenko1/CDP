export const countElems = (string) => {
    if (typeof string !== 'string') {
        throw new TypeError('it is not a string')
    }

    const result = {};

    for (let i of string) {
        if (result[i]) {
            result[i]++
        } else {
            result[i] = 1;
        }
    }

    return JSON.stringify(result);
};