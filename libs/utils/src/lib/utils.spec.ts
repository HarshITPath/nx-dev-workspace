import {
  formatDate,
  isValidDate,
  capitalize,
  slugify,
  truncate,
  formatCurrency,
  randomBetween,
  unique,
  groupBy,
  deepClone,
  omit,
  isEmail,
  isUrl,
  delay
} from './utils.js';

describe('Date utilities', () => {
  test('formatDate should format date correctly', () => {
    const date = new Date('2023-12-25');
    expect(formatDate(date)).toBe('December 25, 2023');
  });

  test('isValidDate should validate dates', () => {
    expect(isValidDate(new Date())).toBe(true);
    expect(isValidDate('invalid')).toBe(false);
  });
});

describe('String utilities', () => {
  test('capitalize should capitalize first letter', () => {
    expect(capitalize('hello world')).toBe('Hello world');
    expect(capitalize('HELLO')).toBe('Hello');
  });

  test('slugify should create URL-friendly strings', () => {
    expect(slugify('Hello World!')).toBe('hello-world');
    expect(slugify('Test & Example')).toBe('test-example');
  });

  test('truncate should limit string length', () => {
    expect(truncate('Hello World', 5)).toBe('Hello...');
    expect(truncate('Hi', 10)).toBe('Hi');
  });
});

describe('Number utilities', () => {
  test('formatCurrency should format numbers as currency', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
  });

  test('randomBetween should return number in range', () => {
    const result = randomBetween(1, 10);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(10);
  });
});

describe('Array utilities', () => {
  test('unique should remove duplicates', () => {
    expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
  });

  test('groupBy should group array items', () => {
    const items = [{ type: 'A', value: 1 }, { type: 'B', value: 2 }, { type: 'A', value: 3 }];
    const grouped = groupBy(items, item => item.type);
    expect(grouped.A).toHaveLength(2);
    expect(grouped.B).toHaveLength(1);
  });
});

describe('Object utilities', () => {
  test('deepClone should create deep copy', () => {
    const obj = { a: 1, b: { c: 2 } };
    const cloned = deepClone(obj);
    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
    expect(cloned.b).not.toBe(obj.b);
  });

  test('omit should remove specified keys', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(omit(obj, ['b'])).toEqual({ a: 1, c: 3 });
  });
});

describe('Validation utilities', () => {
  test('isEmail should validate email addresses', () => {
    expect(isEmail('test@example.com')).toBe(true);
    expect(isEmail('invalid-email')).toBe(false);
  });

  test('isUrl should validate URLs', () => {
    expect(isUrl('https://example.com')).toBe(true);
    expect(isUrl('not-a-url')).toBe(false);
  });
});

describe('Async utilities', () => {
  test('delay should wait specified time', async () => {
    const start = Date.now();
    await delay(100);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(90);
  });
});