import Decimal from 'decimal.js';
import { NumberFormatter } from '../src/NumberFormatter';

describe('NumberFormatter', () => {
  it('constructs with default values (letter, 2 decimals)', () => {
    const fmt = new NumberFormatter();
    // By default => letter, 2 decimals
    expect(fmt.format(new Decimal(1000))).toBe('1.00k');
  });

  it('handles letter notation explicitly', () => {
    const fmt = new NumberFormatter({ notation: 'letter', decimals: 0 });
    expect(fmt.format(new Decimal(1e6))).toBe('1m');
  });

  it('handles scientific notation', () => {
    const fmt = new NumberFormatter({ notation: 'scientific', decimals: 2 });
    expect(fmt.format(new Decimal(1e6))).toBe('1.00e+6');
  });

  it('throws error on Infinity or NaN', () => {
    const fmt = new NumberFormatter();
    expect(() => fmt.format(new Decimal(Infinity))).toThrow();
    expect(() => fmt.format(new Decimal(NaN))).toThrow();
  });
});
