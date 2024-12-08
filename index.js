import { GenerationCore } from "./Generators/GenerationCore.js";

/**
 * Generates a JSON object based on a schema provided in the input text area 
 * and displays the result in the output text area.
 * 
 * This function:
 * 1. Retrieves the schema JSON from the input text area.
 * 2. Parses the schema and uses the `GenerationCore` class to generate data.
 * 3. Outputs the generated data as a JSON string in the output text area.
 * 4. Handles and displays any errors encountered during the process.
 * 
 * @function
 * 
 * @example
 * // HTML structure:
 * <textarea id="inputText">{ "type": "object", "properties": { "name": { "type": "string", "minLength": 5, "maxLength": 10 } }, "required": ["name"] }</textarea>
 * <textarea id="outputText"></textarea>
 * <button onclick="generateText()">Generate</button>
 * 
 * @throws Will set the value of the `outputText` field to the error message if any exceptions occur during JSON parsing or data generation.
 */
export function generateText() {
  // Get text from the first text area
  const inputText = document.getElementById('inputText').value;

  try {
      // Parse and process input data
      const schema = JSON.parse(inputText);

      // Use GenerationCore to generate nested properties
      const generator = new GenerationCore();
      const result = generator.StartGeneration(schema);

      // Put result in the second text area
      document.getElementById('outputText').value = JSON.stringify(result, null, 2);
  } catch (ex) {
      // Handle and display errors
      document.getElementById('outputText').value = `Error: ${ex.message}`;
  }
}

// Attach the function to the global window object for button click to access it
window.generateText = generateText;
