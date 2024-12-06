import { BaseGenerator } from "./BaseGenerator.js";
import { GetRandomNumberBetween } from "../Utils/RandomNumber.js";
import { GetValidValueBetween } from "../Utils/ValueValidator.js";

/**
 * Default minimum value for number generation.
 * @const {number}
 */
const MIN_VALUE = 0;

/**
 * Default maximum value for number generation.
 * @const {number}
 */
const MAX_VALUE = 1000;

/**
 * Class for generating floating-point number based on a provided schema.
 * Extends the `BaseGenerator` class.
 */
export class NumberGenerator extends BaseGenerator {
    /**
     * Generates a random number based on the provided schema.
     * 
     * @param {Object} schema - The schema defining number generation rules.
     * @param {number} [schema.minimum=MIN_VALUE] - Minimum value for the number.
     * @param {number} [schema.maximum=MAX_VALUE] - Maximum value for the number.
     * @returns {number|null} - The generated floating-point number, or `null` if the inputs are invalid.
     * 
     * @example
     * const schema = { minimum: 10, maximum: 50 };
     * const generator = new NumberGenerator();
     * generator.Generate(schema);  // Example output: 37.04558395770728
     * 
     * @example
     * const schema = { minimum: 50, maximum: 10 };
     * const generator = new NumberGenerator();
     * generator.Generate(schema);  // Returns null due to invalid range.
     * 
     * @example
     * const schema = {};
     * const generator = new NumberGenerator();
     * generator.Generate(schema);  // Example output: 851.9987303199414 (using default min and max values).
     */
    Generate(schema) {
        //Get minimum value for the number.
        const min = GetValidValueBetween(schema.minimum, MIN_VALUE);
        //Get maximum value for the number.
        const max = GetValidValueBetween(schema.maximum, MAX_VALUE);
        //Checking the validity of the input data.
        if (typeof min !== 'number' || typeof max !== 'number') {
            return null;
        }
        if (min >= max) {
            return null;
        }
        //Generates a random floating-point number between the minimum and maximum
        return GetRandomNumberBetween(min, max);
    }
}