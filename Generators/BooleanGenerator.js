import { BaseGenerator } from "./BaseGenerator.js";

/**
 * Class for generating random boolean values.
 * Extends the `BaseGenerator` class.
 */
export class BooleanGenerator extends BaseGenerator {
    /**
     * Generates a random boolean value with a 50% probability for `true` and 50% for `false`.
     * 
     * @returns {boolean} - A randomly generated boolean value.
     * 
     * @example
     * const generator = new BooleanGenerator();
     * generator.Generate() // Example output: true
     * 
     * @example
     * const generator = new BooleanGenerator();
     * generator.Generate() // Example output: false
     */
    Generate() {
        // 50% probability of getting true
        return Math.random() < 0.5;
    }
}
