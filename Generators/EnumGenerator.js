import { BaseGenerator } from "./BaseGenerator.js";
import { GetIntRandomNumberUpTo } from "../Utils/RandomNumber.js";

/**
 * Class for generating a random value from an enum schema.
 * Extends the `BaseGenerator` class.
 */
export class EnumGenerator extends BaseGenerator {
    /**
     * Generates a random value from the provided enum schema.
     * 
     * @param {Object} schema - The schema defining the enum.
     * @param {Array} schema.enum - An array of possible values for the enum.
     * @returns {*} - A randomly selected value from the enum, or `null` if the schema is invalid or empty.
     * 
     * @example
     * const schema = { enum: ["red", "green", "blue"] };
     * const generator = new EnumGenerator();
     * generator.Generate(schema) // Example output: "green"
     * 
     * @example
     * const schema = { enum: [] };
     * const generator = new EnumGenerator();
     * generator.Generate(schema) // Returns null due to invalid input.
     */
    Generate(schema) {
        const values = schema.enum;
        //Checking the correctness of an array of possible values for the enum.
        if (!Array.isArray(values) || values.length === 0) {
            return null;
        }
        //Create random index for getting it from enum. values.length - 1 to avoid out-of-bound index.
        const index = GetIntRandomNumberUpTo(values.length - 1);
        return values[index];
    }

}