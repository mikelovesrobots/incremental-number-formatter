import Decimal from 'decimal.js';
import { formatScientific } from '../src/formatScientific';

describe('formatScientific', () => {
  it('formats zero', () => {
    expect(formatScientific(new Decimal(0), 2)).toBe('0.00e+0');
  });

  it('formats a simple positive number', () => {
    expect(formatScientific(new Decimal(1500), 2)).toBe('1.50e+3');
  });

  it('formats a large number with given decimals', () => {
    expect(formatScientific(new Decimal(1e9), 2)).toBe('1.00e+9');
    expect(formatScientific(new Decimal(1.234e9), 3)).toBe('1.234e+9');
  });

  it('formats negative numbers', () => {
    expect(formatScientific(new Decimal(-999), 2)).toBe('-9.99e+2');
  });
});
