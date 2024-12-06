import { GetRandomNumberBetween, GetIntRandomNumberUpTo } from '../Utils/RandomNumber.js';

describe('GetRandomNumberBetween', () => {
  
    test('Should return a random number between 1 and 5', () => {
        const min = 1;
        const max = 5;
        const result = GetRandomNumberBetween(min, max);
        expect(result).toBeGreaterThanOrEqual(min);
        expect(result).toBeLessThanOrEqual(max);
    });

    test('Should return null if min is greater than max', () => {
        expect(GetRandomNumberBetween(5, 1)).toBeNull();
    });

    test('Should return null if min or max is not a number', () => {
        expect(GetRandomNumberBetween('a', 5)).toBeNull();
        expect(GetRandomNumberBetween(5, 'b')).toBeNull();
        expect(GetRandomNumberBetween(null, 5)).toBeNull();
        expect(GetRandomNumberBetween(5, undefined)).toBeNull();
        expect(GetRandomNumberBetween(null, undefined)).toBeNull();
    });

});

describe('GetIntRandomNumberUpTo', () => {
  
    test('Should return a random integer between 0 and 10', () => {
        const max = 10;
        const result = GetIntRandomNumberUpTo(max);
        expect(result).toBeGreaterThanOrEqual(0);
        expect(result).toBeLessThanOrEqual(max);
        expect(Number.isInteger(result)).toBe(true);
    });

    test('Should return null if max is negative', () => {
        expect(GetIntRandomNumberUpTo(-5)).toBeNull();
    });

    test('Should return null if max is not a number', () => {
        expect(GetIntRandomNumberUpTo('a')).toBeNull();
        expect(GetIntRandomNumberUpTo(undefined)).toBeNull();
        expect(GetIntRandomNumberUpTo(null)).toBeNull();
    });

});
