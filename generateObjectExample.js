import { GenerationCore } from "./Generators/GenerationCore.js";

// Define the example schema with multiple data types and nested levels
const exampleSchema = {
    "type": "object",
    "properties": {
        "id": {
            "type": "integer",
            "minimum": 1
        },
        "name": {
            "type": "string",
            "minLength": 3,
            "maxLength": 50
        },
        "isActive": {
            "type": "boolean"
        },
        "score": {
            "type": "number",
            "minimum": 0,
            "maximum": 100
        },
        "tags": {
            "type": "array",
            "items": {
                "type": "string",
                "minLength": 3,
                "maxLength": 50
            },
            "minItems": 1,
            "uniqueItems": true
        },
        "nestedLevel1": {
            "type": "object",
            "properties": {
                "level1Name": {
                    "type": "string",
                    "minLength": 3,
                    "maxLength": 50
                },
                "level1Data": {
                    "type": "object",
                    "properties": {
                        "level2Boolean": {
                            "type": "boolean"
                        },
                        "level2Array": {
                            "type": "array",
                            "items": {
                                "type": "integer"
                            },
                            "minItems": 3,
                            "maxItems": 10
                        },
                        "nestedLevel2": {
                            "type": "object",
                            "properties": {
                                "level3String": {
                                    "type": "string",
                                    "enum": ["value1", "value2", "value3"]
                                },
                                "level3Number": {
                                    "type": "number",
                                    "minimum": 10,
                                    "maximum": 100
                                }
                            },
                            "required": ["level3String", "level3Number"]
                        }
                    },
                    "required": ["level2Boolean", "nestedLevel2"]
                }
            },
            "required": ["level1Name", "level1Data"]
        }
    },
    "required": ["id", "name", "nestedLevel1"]
};

// Create an instance of the GenerationCore class
const generator = new GenerationCore();

// Generate an object based on the provided schema
const generatedObject = generator.StartGeneration(exampleSchema);

// Output the generated object to the console
console.log(JSON.stringify(generatedObject, null, 2));