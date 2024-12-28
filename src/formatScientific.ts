import Decimal from 'decimal.js';

/**
 * Formats a Decimal number using standard scientific notation, e.g. "1.23e+6"
 * @param num The Decimal to format
 * @param decimals Number of decimal places
 */
export function formatScientific(num: Decimal, decimals: number): string {
  return num.toExponential(decimals);
}
