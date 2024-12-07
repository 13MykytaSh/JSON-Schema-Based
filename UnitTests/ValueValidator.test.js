import { GetValidValueBetween } from '../Utils/ValueValidator.js';

describe('GetValidValueBetween', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Should return preferred value if it is valid', () => {
        expect(GetValidValueBetween(5, 10)).toBe(5);
        expect(GetValidValueBetween('test1', 'test2')).toBe('test1');
        expect(GetValidValueBetween(0, 100)).toBe(0);
        expect(GetValidValueBetween(false, true)).toBe(false);
    });

    test('Should return default value if preferred value is null', () => {
        expect(GetValidValueBetween(null, 10)).toBe(10);
        expect(GetValidValueBetween(null, 'test1')).toBe('test1');
    });

    test('Should return default value if preferred value is undefined', () => {
        expect(GetValidValueBetween(undefined, 42)).toBe(42);
        expect(GetValidValueBetween(undefined, 'test1')).toBe('test1');
    });

    test('Should handle falsy values correctly without considering them invalid', () => {
        expect(GetValidValueBetween(0, 5)).toBe(0);
        expect(GetValidValueBetween('', 'fallback')).toBe('');
        expect(GetValidValueBetween(false, true)).toBe(false);
    });

    test('Should return default value if both preferred and default values are null', () => {
        expect(GetValidValueBetween(null, null)).toBe(null);
    });
    
    test('Should return default value if both preferred and default values are undefined', () => {
        expect(GetValidValueBetween(undefined, undefined)).toBe(undefined);
    });
});
