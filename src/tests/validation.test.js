import {
    validateHeight,
    validateWeight,
    validateAge,
    validateGender,
    validateActivityLevel
} from '../utilities/validation';

// ============================================================
// validation.test.js
// Focused on BOUNDARY / EDGE cases for each validator, since that's
// where off-by-one bugs (>= vs >, inclusive vs exclusive ranges) hide.
// For each function we test: the exact lower bound, the exact upper
// bound, one step outside each bound, and a couple of "garbage input"
// cases (empty string, non-numeric text, etc.) since real form fields
// can produce those.
// ============================================================

describe('validateHeight', () => {
    test('accepts the lower boundary (53)', () => {
        expect(validateHeight(53)).toBe(true);
    });

    test('accepts the upper boundary (84)', () => {
        expect(validateHeight(84)).toBe(true);
    });

    test('rejects just below the lower boundary (52)', () => {
        expect(validateHeight(52)).toBe(false);
    });

    test('rejects just above the upper boundary (85)', () => {
        expect(validateHeight(85)).toBe(false);
    });

    test('accepts a numeric string within range (e.g. "70")', () => {
        expect(validateHeight('70')).toBe(true);
    });

    test('rejects an empty string', () => {
        expect(validateHeight('')).toBe(false);
    });

    test('rejects non-numeric text', () => {
        expect(validateHeight('tall')).toBe(false);
    });

    test('rejects negative numbers', () => {
        expect(validateHeight(-10)).toBe(false);
    });
});

describe('validateWeight', () => {
    test('accepts the lower boundary (50)', () => {
        expect(validateWeight(50)).toBe(true);
    });

    test('rejects just below the lower boundary (49)', () => {
        expect(validateWeight(49)).toBe(false);
    });

    test('accepts just below the upper boundary (999)', () => {
        expect(validateWeight(999)).toBe(true);
    });

    test('rejects the upper boundary itself (1000), since the check is exclusive', () => {
        expect(validateWeight(1000)).toBe(false);
    });

    test('rejects an empty string', () => {
        expect(validateWeight('')).toBe(false);
    });

    test('rejects non-numeric text', () => {
        expect(validateWeight('heavy')).toBe(false);
    });
});

describe('validateAge', () => {
    test('accepts the lower boundary (12)', () => {
        expect(validateAge(12)).toBe(true);
    });

    test('accepts the upper boundary (100)', () => {
        expect(validateAge(100)).toBe(true);
    });

    test('rejects just below the lower boundary (11)', () => {
        expect(validateAge(11)).toBe(false);
    });

    test('rejects just above the upper boundary (101)', () => {
        expect(validateAge(101)).toBe(false);
    });

    test('rejects an empty string', () => {
        expect(validateAge('')).toBe(false);
    });

    test('rejects decimal input treated oddly (e.g. "12.5" still passes Number())', () => {
        // Flagging this as a known edge case rather than asserting a "correct"
        // answer: Number("12.5") = 12.5, which passes >= 12 && <= 100.
        // Worth deciding intentionally whether fractional ages should be allowed.
        expect(validateAge('12.5')).toBe(true);
    });
});

describe('validateGender', () => {
    test('accepts uppercase M', () => {
        expect(validateGender('M')).toBe(true);
    });

    test('accepts lowercase m', () => {
        expect(validateGender('m')).toBe(true);
    });

    test('accepts uppercase F', () => {
        expect(validateGender('F')).toBe(true);
    });

    test('accepts lowercase f', () => {
        expect(validateGender('f')).toBe(true);
    });

    test('rejects an empty string', () => {
        expect(validateGender('')).toBe(false);
    });

    test('rejects a full word like "Male"', () => {
        expect(validateGender('Male')).toBe(false);
    });

    test('rejects whitespace-padded input (" M ") since there is no trimming', () => {
        // This documents current behavior. If you want " M " to pass, the
        // validator needs a .trim() added — flagging so it's a deliberate
        // choice rather than an unnoticed gap.
        expect(validateGender(' M ')).toBe(false);
    });
});

describe('validateActivityLevel', () => {
    test('accepts the lower boundary (1)', () => {
        expect(validateActivityLevel(1)).toBe(true);
    });

    test('accepts the upper boundary (5)', () => {
        expect(validateActivityLevel(5)).toBe(true);
    });

    test('rejects 0', () => {
        expect(validateActivityLevel(0)).toBe(false);
    });

    test('rejects 6', () => {
        expect(validateActivityLevel(6)).toBe(false);
    });

    test('accepts a numeric string from a <select> element (e.g. "3")', () => {
        expect(validateActivityLevel('3')).toBe(true);
    });

    test('rejects an empty string (the "Select One" default option)', () => {
        expect(validateActivityLevel('')).toBe(false);
    });
});