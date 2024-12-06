import { BaseGenerator } from './BaseGenerator.js';
import { GetRandomNumberBetween } from "../Utils/RandomNumber.js";
import { GetValidValueBetween } from "../Utils/ValueValidator.js";
import { GenerationCore } from "./GenerationCore.js";

/**
 * Default value indicating whether array items should be unique.
 * @const {boolean}
 */
const UNIQUE_ITEMS = false;

/**
 * Default minimum number of items in the array.
 * @const {number}
 */
const MIN_ITEMS = 1;

/**
 * Default maximum number of items in the array.
 * @const {number}
 */
const MAX_ITEMS = 5;

/**
 * Class for generating arrays based on a provided schema.
 * Extends the `BaseGenerator` class.
 */
export class ArrayGenerator extends BaseGenerator {
    /**
     * Generates an array of items based on the provided schema.
     * 
     * @param {Object} schema - The schema defining the array generation rules.
     * @param {Object} schema.items - The schema for the items within the array.
     * @param {number} [schema.minItems=MIN_ITEMS] - The minimum number of items in the array.
     * @param {number} [schema.maxItems=MAX_ITEMS] - The maximum number of items in the array.
     * @param {boolean} [schema.uniqueItems=UNIQUE_ITEMS] - Whether the items in the array should be unique.
     * @returns {Array} - The generated array of items.
     * 
     * @example
     * const schema = {
     *   items: { type: 'integer' },
     *   minItems: 2,
     *   maxItems: 4,
     *   uniqueItems: true
     * };
     * const generator = new ArrayGenerator();
     * generator.Generate() // Example output: [234, 408, 536]
     */
    Generate(schema) {
        //Get schema from items
        const itemsSchema = schema.items;
        //Get minimum number of items in the array.
        const minItems = GetValidValueBetween(schema.minItems, MIN_ITEMS);
        //Get maximum number of items in the array.
        const maxItems = GetValidValueBetween(schema.maxItems, MAX_ITEMS);
        //Determining whether the items should be unique.
        const uniqueItems = GetValidValueBetween(schema.uniqueItems, UNIQUE_ITEMS);
        //Create random length between the minimum and maximum.
        const length = Math.floor(GetRandomNumberBetween(minItems, maxItems));
        //Create Set for storing the obtained items.
        const generatedItems = new Set();
        //Create array for result
        const result = [];

        //Use GenerationCore to generate nested properties
        const generator = new GenerationCore();

        while (generatedItems.size < length) {
            //Call item generation
            const item = generator.StartGeneration(itemsSchema);
            if (uniqueItems) {
                //If uniqueItems make JSON from item to filter out duplicates
                const itemStr = JSON.stringify(item);
                if (generatedItems.has(itemStr))
                    continue;
                else
                    generatedItems.add(itemStr);
            }
            result.push(item);
        }

        return result;
    }
}