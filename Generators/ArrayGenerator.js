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
     * @returns {Array} - The generated array of items, if the input parameters are incorrect, an empty array will be returned
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
        //Checking the validity of the input data.
        if (!itemsSchema || typeof itemsSchema !== 'object' || !itemsSchema.type) {
            return [];
        }
        //Get minimum number of items in the array.
        const minItems = GetValidValueBetween(schema.minItems, MIN_ITEMS);
        //Get maximum number of items in the array.
        const maxItems = GetValidValueBetween(schema.maxItems, MAX_ITEMS);
        //Determining whether the items should be unique.
        const uniqueItems = GetValidValueBetween(schema.uniqueItems, UNIQUE_ITEMS);
        //Create random length between the minimum and maximum.
        const length = Math.floor(GetRandomNumberBetween(minItems, maxItems));

        //Incorrect input data validations. It's not good to adapt, it's better for the user to change the scheme than for us to change the results.

        //Can't genere. It is impossible to generate an array with more than two elements with a data type that has only 2 options.
        if (itemsSchema.type === 'boolean' && uniqueItems && length > 2)
            return [];

        //In general MinItems < 0 is not normal. in case with random generation length can be > 0
        //MinItems is set to <= 0 and length can be <=0 or parameters were specified incorrectly to generate the length.
        if (length <=0 || length === null)
            return [];

        //Unable to generate unique integers in low range.
        if (itemsSchema.type === 'integer' && uniqueItems) {
            const range = itemsSchema.maximum - itemsSchema.minimum + 1;
            if (length > range) {
                return [];
            }
        }

        //Create Set for storing the obtained items.
        const generatedItems = new Set();
        //Create array for result
        const result = [];

        //Use GenerationCore to generate nested properties.
        const generator = new GenerationCore();
        //Used to count the number of elements created to meet the condition for exiting the cycle
        let itemsCunter = 0;
        while (itemsCunter < length) {
            //Call item generation
            const item = generator.StartGeneration(itemsSchema);
            if (uniqueItems) {
                //If uniqueItems make JSON from item to filter out duplicates.
                const itemStr = JSON.stringify(item);
                if (generatedItems.has(itemStr))
                    continue;
                else
                    generatedItems.add(itemStr);
            }
            result.push(item);
            itemsCunter++;
        }

        return result;
    }
}