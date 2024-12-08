
# JSON Schema-Based Generator

This project is a JSON Schema-based data generator that processes schemas and produces corresponding data. It includes modules to generate strings, numbers, booleans, arrays, and objects according to the provided JSON Schema. Additionally, it includes a simple static file server to serve the project in a web environment.

---

## Features

- **JSON Schema Parsing**: Generate random data based on JSON Schema definitions.
- **Flexible Types**: Supports string, number, integer, boolean, array, and object types.
- **Enum Support**: Randomly selects a value from the `enum` property if defined.
- **Validation**: Handles required fields and validates schema definitions.
- **Static Server**: Serves HTML and JavaScript files via a simple HTTP server.

---

## Prerequisites

- **Node.js** (v14 or later)
- **npm** (v6 or later)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/13MykytaSh/JSON-Schema-Based.git
   ```

## Install dependencies:
```bash
npm install
```
## Browser usage

1. Start the Project
Open a terminal in the project directory and run:
```bash
node server.js
```

2. Access the Application
Open your browser and navigate to:
```bash
http://localhost:3000
```
3. Use the Application
- Enter a valid JSON Schema in the input text box.
- Click the "Generate" button.
- The generated output will appear in the output text box.


#### Example String
```bash
{"type":"object","properties":{"id":{"type":"integer","minimum":1},"name":{"type":"string","minLength":3,"maxLength":50},"isActive":{"type":"boolean"},"score":{"type":"number","minimum":0,"maximum":100},"tags":{"type":"array","items":{"type":"string","minLength":3,"maxLength":50},"minItems":1,"uniqueItems":true},"nestedLevel1":{"type":"object","properties":{"level1Name":{"type":"string","minLength":3,"maxLength":50},"level1Data":{"type":"object","properties":{"level2Boolean":{"type":"boolean"},"level2Array":{"type":"array","items":{"type":"integer"},"minItems":3,"maxItems":10},"nestedLevel2":{"type":"object","properties":{"level3String":{"type":"string","enum":["value1","value2","value3"]},"level3Number":{"type":"number","minimum":10,"maximum":100}},"required":["level3String","level3Number"]}},"required":["level2Boolean","nestedLevel2"]}},"required":["level1Name","level1Data"]}},"required":["id","name","nestedLevel1"]}
```
#### Result 
```bash
{
  "id": 975,
  "name": "lLPJ0XKCSSWSPPkgHEoUkBShh69PlEfj5jGzTE88o",
  "nestedLevel1": {
    "level1Name": "5iz1hcQvQvLi2uy4D2lRh1x7klfIQODALwqq",
    "level1Data": {
      "level2Boolean": true,
      "nestedLevel2": {
        "level3String": "value2",
        "level3Number": 56.77874937095495
      }
    }
  },
  "tags": [
    "FVhZGYZRUL16jBd4o",
    "cmx5GzRKUk2bd",
    "dQCHZicM5P0byKdiEgLwcu",
    "yQaWqSWg9uujT3YI84UHqmVUEsRto"
  ]
}
```
## IDE usage

Open your IDE. In the root directory, you will find the file generateObjectExample.js.

It contains an example object and the implementation of a parsing call.

#### Run script
```bash
node generateObjectExample.js
```

The result will be displayed in the console.


#### File example
```bash
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
```

#### Result 
```bash
{
  "id": 260,
  "name": "yujCuOdXpceDsA2N63G2ZSBc0O",
  "nestedLevel1": {
    "level1Name": "QUgugtJMXfKpk9zSh2rulhqKa2SbQwB5pRe8",
    "level1Data": {
      "level2Boolean": false,
      "nestedLevel2": {
        "level3String": "value2",
        "level3Number": 67.44514828306697
      },
      "level2Array": [
        460,
        571,
        444,
        841,
        369,
        147
      ]
    }
  },
  "isActive": false
}
```
## All simple examples


### Integer example
```
Schema
{"type": "integer","minimum": 45,"maximum":100} 

Result output
93
```
---
### Number example
```
Schema
{"type": "number","minimum": 45,"maximum":100} 

Result output
84.25091255245691
```
---
### String example
```
Schema
{"type": "string","minLength": 10,"maxLength":50} 

Result output
"GSCzYpWTNIm"
```
---
### Array example
```
Schema
{"type": "array","items":{"type":"string","minLength": 10,"maxLength":50},"minItems":5,"maxItems":10}

Result output
[
  "ZBKCKk7MpKmPMOzmU5mNkAWV",
  "kEueTBsxMn32EnS7ucR",
  "jdZJv6IUWuOH8e9htGWpluOv1aai",
  "DVZUSmoBW6yiNDR0dQTcWi09Bi9MCQuSxtCI",
  "pelv4H8xYoAlyGKAJoNWau95UOE2PBy3qyU4AcnVIV3T2",
  "ggpv42kSw68ykChGpkZvbOEch9wXEj",
  "vSdg4NNn9J5avmrxB0E3Iw21IIzrN",
  "GDSlOhmGQbvVGMdV",
  "PW4x206SUVlUBVczwgOOXKZLoVnTowGk3tn"
]
```
---
### Enum example
```
Schema
{ "enum": ["red", "green","yellow", "blue","magenta","black","white"] } 

Result output
"magenta"

```
---
### Object example
```
Schema
{"type":"object","properties":{"name":{"type":"string","minLength": 5,"maxLength":15},"age":{"type":"integer","minimum": 10,"maximum":50},"isActive":{"type":"boolean"}},"required":["name"]}

Result output
{
  "name": "7D0WHAnYy",
  "age": 46
}
```
## Running Unit Tests

To run tests with Jest, run the following command

```bash
  npm run "Run tests"
```


## Project Structure

```bash
├── Generators
│   ├── ArrayGenerator.js         # Handles array generation
│   ├── BooleanGenerator.js       # Handles boolean generation
│   ├── EnumGenerator.js          # Handles enum generation
│   ├── IntegerGenerator.js       # Handles integer generation
│   ├── NumberGenerator.js        # Handles number generation
│   ├── ObjectGenerator.js        # Handles object generation
│   ├── StringGenerator.js        # Handles string generation
│   └── GenerationCore.js         # Core logic for data generation
├── Utils
│   ├── RandomNumber.js           # Utility for generating random numbers
│   ├── ValueValidator.js         # Utility for validating values
├── UnitTests                     # Contains Jest test files
│   ├── ArrayGenerator.test.js  
│   ├── BooleanGenerator.test.js
│   ├── EnumGenerator.test.js   
│   ├── IntegerGenerator.test.js
│   ├── NumberGenerator.test.js 
│   ├── ObjectGenerator.test.js 
│   ├── StringGenerator.test.js 
│   ├── GenerationCore.test.js  
│   ├── RandomNumber.test.js    
│   └── ValueValidator.test.js  
├── server.js                     # Simple HTTP server
├── index.html                    # Frontend interface
├── style.css                     # Styling for the frontend
└── README.md                     # Project documentation
```
