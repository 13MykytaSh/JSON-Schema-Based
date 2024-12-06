/**
 * Generates a random number between the specified minimum and maximum values.
 * 
 * @param {number} min - The minimum value (inclusive).
 * @param {number} max - The maximum value (inclusive).
 * @returns {number|null} - A random number between `min` and `max`, or `null` if the inputs are invalid.
 * 
 * @example
 * GetRandomNumberBetween(1, 5); // Example output: 2.7345
 * 
 * @example
 * GetRandomNumberBetween(5, 1); // Returns null due to invalid range.
 */
export function GetRandomNumberBetween(min, max) {
    // Checking the validity of the input data.
    if (typeof min !== 'number' || typeof max !== 'number') {
        return null;
    }
    if (min >= max) {
        return null;
    }
    // The maximum is inclusive and the minimum is inclusive
    return Math.random() * (max - min + 1) + min;
}

/**
 * Generates a random integer between 0 (inclusive) and the specified maximum value (inclusive).
 * 
 * @param {number} max - The maximum value (inclusive).
 * @returns {number|null} - A random integer between 0 and `max`, or `null` if the input is invalid.
 * 
 * @example
 * GetIntRandomNumberUpTo(10); // Example output: 7
 * 
 * @example
 * GetIntRandomNumberUpTo(-5); // Returns null due to invalid input.
 */
export function GetIntRandomNumberUpTo(max) {
    //Checking the validity of the input data.
    if (typeof max !== 'number' || max < 0) {
        return null;
    }
    return Math.round(Math.random() * max);
}
