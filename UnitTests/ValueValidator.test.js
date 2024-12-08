import { GetValidValueBetween } from '../Utils/ValueValidator.js';

// The GetValidValueBetween function is tested.
// Checked when preferedValue has a valid value - the function should return preferedValue.
// Checked when preferedValue is null or undefined - the function should return defaultValue.
// Checked when preferedValue has false values, but is not null or undefined - for example, 0, ''.

describe('GetValidValueBetween', () => {

    afterEach(() => {
        // Clear all mock calls between tests
        jest.clearAllMocks();
    });

    //Tests a function for valid first values. Expected first value
    it('Should return preferred value if it is valid', () => {
        expect(GetValidValueBetween(5, 10)).toBe(5);
        expect(GetValidValueBetween('test1', 'test2')).toBe('test1');
        expect(GetValidValueBetween(0, 100)).toBe(0);
        expect(GetValidValueBetween(false, true)).toBe(false);
        expect(GetValidValueBetween('', 'fallback')).toBe('');
    });

    //Tests a function for `null` first values. Expected second value
    it('Should return default value if preferred value is null', () => {
        expect(GetValidValueBetween(null, 10)).toBe(10);
        expect(GetValidValueBetween(null, 'test1')).toBe('test1');
    });

    //Tests a function for `undefined` first values. Expected second value
    it('Should return default value if preferred value is undefined', () => {
        expect(GetValidValueBetween(undefined, 42)).toBe(42);
        expect(GetValidValueBetween(undefined, 'test1')).toBe('test1');
    });
    
    //Tests a function for `null` both values. Expected `null`
    it('Should return default value if both preferred and default values are null', () => {
        expect(GetValidValueBetween(null, null)).toBe(null);
    });

    //Tests a function for `undefined` both values. Expected  `undefined`
    it('Should return default value if both preferred and default values are undefined', () => {
        expect(GetValidValueBetween(undefined, undefined)).toBe(undefined);
    });
});
