import { BaseGenerator } from "./BaseGenerator.js";
import { BooleanGenerator } from "./BooleanGenerator.js";
import { GenerationCore } from "./GenerationCore.js";

/**
 * Class for generating objects based on a provided schema.
 * Extends the `BaseGenerator` class.
 */
export class ObjectGenerator extends BaseGenerator {

    /**
     * Generates an object based on the provided schema.
     * 
     * @param {Object} schema - The schema defining object generation rules.
     * @param {Object} [schema.properties] - The properties schema for the object.
     * @param {Array} [schema.required=[]] - The list of required properties.
     * @returns {Object} - The generated object, or `{}` if the properties are invalid.
     * 
     * @example
     * const schema = {
     *    properties: {
     *      name: { type: "string", minLength: 3, maxLength: 15  },
     *      age: { type: "integer", minimum: 1, maximum: 100 },
     *      isActive: { type: "boolean" }
     *    },
     *    required: ["name","age"]
     *  };
     * const generator = new ObjectGenerator();
     * generator.Generate(schema); 
     * // Example output: {name: 'hX57CnC1pr1VQV', age: 45, isActive: false}
     * 
     * @example
     * const schema = {};
     * const generator = new ObjectGenerator();
     * generator.Generate(schema);  // Returns an empty object.
     */
    Generate(schema) {
        //Create result object.
        const result = {};
        //Checking the validity of the input data. Can't generate without properties.
        if (!schema.properties)
            return result;
        const properties = schema.properties;
        const required = schema.required || [];

        //Use GenerationCore to generate nested properties
        const generator = new GenerationCore();
        //Generate required properties.
        for (const requiredProp of required) {
            //Get property description by required property name from required array.
            const propSchema = properties[requiredProp];
            //Check if such a property exists in the general set of properties.
            if (propSchema) {
                //Generating a property.
                result[requiredProp] = generator.StartGeneration(propSchema);
            }
            else
                //Can't generate object no schema
                result[requiredProp] = null;
        }
        //For optional parameters use BooleanGenerator, this will allow to get a random number of generated properties
        const boolGen = new BooleanGenerator();
        //Generate optional properties.
        for (const [propName, propSchema] of Object.entries(properties)) {
            //Check if the property name is contained in required. If it is contained, then it is already generated
            if (!required.includes(propName)) {
                //Generate random boolean
                if (boolGen.Generate()) {
                    result[propName] = generator.StartGeneration(propSchema);
                }
            }
        }

        return result;
    }
}
