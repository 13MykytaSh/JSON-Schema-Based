import { GetRandomNumberBetween, GetIntRandomNumberUpTo } from '../Utils/RandomNumber.js';

// The GetRandomNumberBetween function is tested.
// Check if result is within min, max
// Check if function returns null if min is greater than max. min or max are not numbers (strings, null, undefined).
// Check behavior when min === max

describe('GetRandomNumberBetween', () => {

    //Test correct work number generation with correct range
    it('Should return a random number between 1 and 5', () => {
        const min = 1;
        const max = 5;
        const result = GetRandomNumberBetween(min, max);
        expect(result).toBeGreaterThanOrEqual(min);
        expect(result).toBeLessThanOrEqual(max);
    });

    //Test correct work number generation with uncorrect range. Expected result is null
    it('Should return null if min is greater than max', () => {
        expect(GetRandomNumberBetween(5, 1)).toBeNull();
    });

    //Test correct work number generation with range where min is equal to max. 
    it('Should return min if min is equal to max', () => {
        expect(GetRandomNumberBetween(5, 5)).toBe(5);
    });

    //Test correct work number generation with uncorrect parameter min or max. Expected result is null
    it('Should return null if min or max is not a number', () => {
        expect(GetRandomNumberBetween('a', 5)).toBeNull();
        expect(GetRandomNumberBetween(5, 'b')).toBeNull();
        expect(GetRandomNumberBetween(null, 5)).toBeNull();
        expect(GetRandomNumberBetween(5, undefined)).toBeNull();
        expect(GetRandomNumberBetween(null, undefined)).toBeNull();
    });

});

// The GetRandomNumberBetween function is tested.
// Check if the result is within [0, max]
// Check if the result is an integer (Number.isInteger).
// Check if the function returns null, max is negative. max is not a number (strings, null, undefined).
// Check what the function returns when max = 0

describe('GetIntRandomNumberUpTo', () => {

    //Test correct work number generation with correct max and result is an integer
    it('Should return a random integer between 0 and 10', () => {
        const max = 10;
        const result = GetIntRandomNumberUpTo(max);
        expect(result).toBeGreaterThanOrEqual(0);
        expect(result).toBeLessThanOrEqual(max);
        expect(Number.isInteger(result)).toBe(true);
    });

    //Test correct work number generation with correct max value is 0. Expected result is 0
    it('Should return 0 if max is 0', () => {
        expect(GetIntRandomNumberUpTo(0)).toBe(0);
    });

    //Test correct work number generation with uncorrect max(negative). Expected result is null
    it('Should return null if max is negative', () => {
        expect(GetIntRandomNumberUpTo(-5)).toBeNull();
    });

    //Test correct work number generation with uncorrect max parameter. Expected result is null
    it('Should return null if max is not a number', () => {
        expect(GetIntRandomNumberUpTo('a')).toBeNull();
        expect(GetIntRandomNumberUpTo(undefined)).toBeNull();
        expect(GetIntRandomNumberUpTo(null)).toBeNull();
    });

});
