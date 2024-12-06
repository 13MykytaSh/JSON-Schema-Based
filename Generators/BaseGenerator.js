/**
 * Base class for data generators. 
 * Provides a foundation for creating custom generators for various schema types.
 */
export class BaseGenerator {
    /**
     * Initializes the base generator.
     */
    constructor() {
        // Initialization logic can be added here, if needed
    }

    /**
     * Base method to generate data. Should be overridden by derived classes.
     * 
     * @param {Object} schema - The schema defining the rules for data generation.
     * @returns {void} - This method does not return any value by default.
     * 
     * @example
     * class CustomGenerator extends BaseGenerator {
     *     Generate(schema) {
     *         // Custom implementation for generating data
     *     }
     * }
     */
    Generate(schema) {
        // Placeholder for derived class implementation
    }
}