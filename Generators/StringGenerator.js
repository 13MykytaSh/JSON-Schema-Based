import { GetIntRandomNumberUpTo, GetRandomNumberBetween } from "../Utils/RandomNumber.js";
import { GetValidValueBetween } from "../Utils/ValueValidator.js";
import { BaseGenerator } from "./BaseGenerator.js";

/**
 * Default minimum length for generated strings.
 * @const {number}
 */
const MIN_LENGTH = 1;

/**
 * Default maximum length for generated strings.
 * @const {number}
 */
const MAX_LENGTH = 256;

/**
 * Characters used for string generation.
 * @const {string}
 */
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";


export class StringGenerator extends BaseGenerator {
    /**
     * Generates a random string based on the provided schema.
     * 
     * @param {Object} schema - The schema defining string generation rules.
     * @param {number} [schema.minLength=MIN_LENGTH] - Minimum length of the string.
     * @param {number} [schema.maxLength=MAX_LENGTH] - Maximum length of the string.
     * @returns {string|null} - The generated string, or `null` if the inputs are invalid.
     * 
     * @example
     * const schema = { minLength: 5, maxLength: 10 };
     * const generator = new StringGenerator();
     * generator.Generate(schema);  // Example output: "aBc12"
     * 
     * @example
     * const schema = { minLength: 10, maxLength: 5 };
     * const generator = new StringGenerator();
     * generator.Generate(schema); // Returns null due to invalid range.
     * 
     * @example
     * const schema = {};
     * const generator = new StringGenerator();
     * generator.Generate(schema);  // Example output: "AbCDEf" (using default min and max values).
     */
    Generate(schema) {
        //Get minimum length of the string.
        const minL = GetValidValueBetween(schema.minLength, MIN_LENGTH);
        //Get maximum length of the string.
        const maxL = GetValidValueBetween(schema.maxLength, MAX_LENGTH);
        //Checking the validity of the input data.
        if (typeof minL !== 'number' || typeof maxL !== 'number') {
            return null;
        }
        if (minL >= maxL) {
            return null;
        }
        //Create random length between the minimum and maximum.
        const stringLength = Math.floor(GetRandomNumberBetween(minL, maxL));
        const charactersLength = characters.length;
        //Create an array and join it to obtain a string.
        return Array.from(
            //Create an array-like object with length field for Array.from function.
            { length: stringLength },
            //Using a function called for each element of the array, we obtain a random character from the character storage.
            () => characters[GetIntRandomNumberUpTo(charactersLength)])
            //Adds all the elements of an array into a string, separated by empty.
            .join('');
    }
}