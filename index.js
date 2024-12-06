import { GenerationCore } from "./Generators/GenerationCore.js";

// Define the generateText function
export function generateText() {
  // Get text from the first text area
  const inputText = document.getElementById('inputText').value;
  try {
    //Parse and process input data

    //Use GenerationCore to generate nested properties
    const generator = new GenerationCore();
    const result = generator.StartGeneration(JSON.parse(inputText));
    // Put result in the second text area
    document.getElementById('outputText').value = JSON.stringify(result);
  }
  catch (ex) {
    document.getElementById('outputText').value = ex;
  }
}

// Attach the function to the global window object for button click to access it
window.generateText = generateText;