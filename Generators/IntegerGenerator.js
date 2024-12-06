import { NumberGenerator } from "./NumberGenerator.js";

/**
 * Class for generating integer based on a provided schema.
 * Extends the `NumberGenerator` class.
 */
export class IntegerGenerator extends NumberGenerator {
    /**
     * Generates a random integer based on the provided schema.
     * 
     * @param {Object} schema - The schema defining integer generation rules.
     * @param {number} [schema.minimum=MIN_VALUE] - Minimum value for the integer.
     * @param {number} [schema.maximum=MAX_VALUE] - Maximum value for the integer.
     * @returns {number|null} - The generated integer number, or `null` if the inputs are invalid.
     * 
     * @example
     * const schema = { minimum: 10, maximum: 50 };
     * const generator = new IntegerGenerator();
     * generator.Generate(schema) // Example output: 35
     * 
     * @example
     * const schema = { minimum: 50, maximum: 10 };
     * const generator = new IntegerGenerator();
     * generator.Generate(schema) // Returns null due to invalid range.
     * 
     * @example
     * const schema = {};
     * const generator = new IntegerGenerator();
     * generator.Generate(schema)// Example output: 537 (using default min and max values).
    */
    Generate(schema) {
        //Generates a random floating-point number between the minimum and maximum
        const floatValue = super.Generate(schema)

        //Math.round(null) === 0 not correct
        if (floatValue === null)
            return floatValue;

        //Round a random floating-point number for getting integer
        return Math.round(floatValue);
    }
}
