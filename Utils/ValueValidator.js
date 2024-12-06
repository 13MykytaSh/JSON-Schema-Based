
/**
 * Returns a valid value based on the provided preferred and default values.
 * If the preferred value is not `null` or `undefined`, it is returned; otherwise, the default value is returned.
 * 
 * @param {*} preferedValue - The preferred value to return if it is valid.
 * @param {*} defaultValue - The default value to return if the preferred value is `null` or `undefined`.
 * @returns {*} - The preferred value if it is valid; otherwise, the default value.
 * 
 * @example
 * GetValidValueBetween(5, 10); // Example output: 5
 * 
 * @example
 * GetValidValueBetween(null, 10); // Example output: 10
 * 
 * @example
 * GetValidValueBetween(undefined, 10); // Example output: 10
 */
export function GetValidValueBetween(preferedValue, defaultValue) {
    //Compare value with null and undefined to exclude scenarios where a suitable element with a value of 0 could be considered false.
    if (preferedValue !== null && preferedValue !== undefined) {
        return preferedValue;
    }
    return defaultValue;
}