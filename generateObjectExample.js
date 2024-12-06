import { GenerationCore } from "./Generators/GenerationCore.js";

const exampleSchema = {
    type: 'object',
    properties: {
        id: { type: 'integer', minimum: 1, maximum: 1000 },
        name: { type: 'string', minLength: 3, maxLength: 15 },
        age: { type: 'integer', minimum: 0, maximum: 100 },
        isActive: { type: 'boolean' },
        hobbies: {
            type: 'array',
            items: { type: 'string', minLength: 3, maxLength: 10 },
            minItems: 1,
            maxItems: 3,
            uniqueItems: true
        },
        status: {
            type: 'string',
            enum: ['active', 'inactive', 'banned']
        }
    },
    required: ['id', 'name', 'age']
};
const generator = new GenerationCore();
const result = generator.StartGeneration(exampleSchema);
console.dir(result)
