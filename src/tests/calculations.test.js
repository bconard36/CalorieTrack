import {
    calcMetricHeight,
    calcMetricWeight,
    calcBMI,
    calcBMR,
    calcDaily
} from '../utilities/calculations';

// ============================================================
// calculations.test.js
// Covers unit conversions, the BMI/BMR formulas, and every branch of
// the TDEE activity-multiplier lookup in calcDaily — including the
// "no matching level" fallthrough that previously returned undefined
// silently.
// ============================================================

describe('calcMetricHeight', () => {
    test('converts a known height correctly (70 inches -> ~1.778m)', () => {
        expect(calcMetricHeight(70)).toBeCloseTo(1.778, 3);
    });

    test('handles a string input the same as a number (coercion via multiplication)', () => {
        expect(calcMetricHeight('70')).toBeCloseTo(1.778, 3);
    });

    test('returns 0 for a height of 0', () => {
        expect(calcMetricHeight(0)).toBe(0);
    });
});

describe('calcMetricWeight', () => {
    test('converts a known weight correctly (154 lbs -> ~69.85 kg)', () => {
        expect(calcMetricWeight(154)).toBeCloseTo(69.853, 2);
    });

    test('handles a string input the same as a number', () => {
        expect(calcMetricWeight('154')).toBeCloseTo(69.853, 2);
    });

    test('returns 0 for a weight of 0', () => {
        expect(calcMetricWeight(0)).toBe(0);
    });
});

describe('calcBMI', () => {
    test('calculates a known BMI correctly and rounds to 1 decimal', () => {
        // ~70kg, 1.78m -> BMI ~22.1
        const bmi = calcBMI(70, 1.78);
        expect(bmi).toBe('22.1');
    });

    test('returns a string, not a number (since it uses toFixed)', () => {
        expect(typeof calcBMI(70, 1.78)).toBe('string');
    });
});

describe('calcBMR', () => {
    test('uses the male formula branch for "M"', () => {
        // 70kg, 1.78m, age 30, male
        const bmr = calcBMR('M', 70, 1.78, 30);
        expect(bmr).toBeCloseTo(1667.5, 1);
    });

    test('uses the male formula branch for lowercase "m" too', () => {
        const bmr = calcBMR('m', 70, 1.78, 30);
        expect(bmr).toBeCloseTo(1667.5, 1);
    });

    test('uses the female formula branch for "F"', () => {
        const bmr = calcBMR('F', 70, 1.78, 30);
        expect(bmr).toBeCloseTo(1501.5, 1);
    });

    test('uses the female formula branch for lowercase "f" too', () => {
        const bmr = calcBMR('f', 70, 1.78, 30);
        expect(bmr).toBeCloseTo(1501.5, 1);
    });

    test('returns a raw (unrounded) number, not a display-formatted string', () => {
        const bmr = calcBMR('M', 70, 1.78, 30);
        expect(typeof bmr).toBe('number');
    });
});

describe('calcDaily', () => {
    // A fixed BMR to isolate just the activity-multiplier logic
    const testBmr = 1500;

    test('level 1 (Sedentary) applies the 1.2 multiplier', () => {
        expect(calcDaily(1, testBmr)).toBe('1800');
    });

    test('level 2 (Lightly Active) applies the 1.375 multiplier', () => {
        expect(calcDaily(2, testBmr)).toBe('2063'); // 2062.5 rounds to 2063
    });

    test('level 3 (Moderately Active) applies the 1.55 multiplier', () => {
        expect(calcDaily(3, testBmr)).toBe('2325');
    });

    test('level 4 (Very Active) applies the 1.725 multiplier', () => {
        expect(calcDaily(4, testBmr)).toBe('2588'); // 2587.5 rounds to 2588
    });

    test('level 5 (Extra Active) applies the 1.9 multiplier', () => {
        expect(calcDaily(5, testBmr)).toBe('2850');
    });

    test('accepts a numeric string level (e.g. "3"), matching what a <select> provides', () => {
        expect(calcDaily('3', testBmr)).toBe('2325');
    });

    test('returns undefined for an out-of-range level (0) — no matching branch', () => {
        expect(calcDaily(0, testBmr)).toBeUndefined();
    });

    test('returns undefined for an out-of-range level (6) — no matching branch', () => {
        expect(calcDaily(6, testBmr)).toBeUndefined();
    });

    test('returns undefined for a non-numeric level', () => {
        expect(calcDaily('active', testBmr)).toBeUndefined();
    });
});