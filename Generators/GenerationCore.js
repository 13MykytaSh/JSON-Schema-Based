import { ArrayGenerator } from "./ArrayGenerator.js";
import { BooleanGenerator } from "./BooleanGenerator.js";
import { EnumGenerator } from "./EnumGenerator.js";
import { IntegerGenerator } from "./IntegerGenerator.js";
import { NumberGenerator } from "./NumberGenerator.js";
import { ObjectGenerator } from "./ObjectGenerator.js";
import { StringGenerator } from "./StringGenerator.js";

export class GenerationCore {
    /**
     * Generates data based on the provided schema.
     * 
     * @param {Object} schema - The schema defining the rules for generating data.
     * @param {string} [schema.type] - The type of data to generate. Supported types are:
     *   - `"string"`: Generates a string.
     *   - `"number"`: Generates a number.
     *   - `"integer"`: Generates an integer.
     *   - `"boolean"`: Generates a boolean.
     *   - `"array"`: Generates an array.
     *   - `"object"`: Generates an object.
     * @param {Array} [schema.enum] - If present, selects a random value from this enumeration.
     * @returns {*} - The generated data based on the schema.
     * @throws {Error} - Throws an error if the schema is invalid or if the type is unsupported.
     * 
     * @example
     * const schema = { type: "string", minLength: 5, maxLength: 10 };
     * const core = new GenerationCore();
     * core.StartGeneration(schema); // Example output: "2GccnESNy0"
     * 
     * @example
     * const schema = { enum: ["red", "green", "blue"] };
     * const core = new GenerationCore();
     * core.StartGeneration(schema); // Example output: "green"
     * 
     * @example
     * const schema = {
     *   type: "object",
     *   properties: {
     *     name: { type: "string", minLength: 5, maxLength: 10 }
     *   },
     *   required: ["name"]
     * };
     * const core = new GenerationCore();
     * core.StartGeneration(schema); // Example output: { name: "Ooliy14Bz" }
     */
    StartGeneration(schema) {
        //Checking the validity of the input data.
        if (!schema || typeof schema !== 'object') {
            throw new Error('Invalid schema provided.');
        }

        // Determine the appropriate generator
        const generator = this.#GetGenerator(schema.enum ? 'enum' : schema.type)
        return generator.Generate(schema);
    }

    /**
     * Retrieves the generator instance based on the type.
     * 
     * @param {string} type - The type of generator to retrieve.
     * @returns {Object} - The corresponding generator instance.
     * @throws {Error} - Throws an error if the type is unsupported.
     * 
     * @private
     */
    #GetGenerator(type) {
        switch (type) {
            case 'enum':
                return new EnumGenerator();
            case 'string':
                return new StringGenerator();
            case 'number':
                return new NumberGenerator();
            case 'integer':
                return new IntegerGenerator();
            case 'boolean':
                return new BooleanGenerator();
            case 'array':
                return new ArrayGenerator();
            case 'object':
                return new ObjectGenerator();
            default:
                throw new Error(`Unsupported type: ${type}`);
        }
    }
}