import Decimal from 'decimal.js';
import { formatLetter } from './formatLetter';
import { formatScientific } from './formatScientific';

export type Notation = 'scientific' | 'letter';

export interface NumberFormatterOptions {
  decimals?: number;   // number of decimal places to display
  notation?: Notation; // 'scientific' or 'letter'
}

/**
 * NumberFormatter: A class-based formatter that can handle
 * either letter notation or scientific notation.
 */
export class NumberFormatter {
  private decimals: number;
  private notation: Notation;

  constructor(options: NumberFormatterOptions = {}) {
    this.decimals = options.decimals ?? 2;
    this.notation = options.notation ?? 'letter';
  }

  /**
   * Formats a Decimal value into either letter or scientific notation.
   * @param num The decimal.js instance
   * @returns A formatted string
   */
  public format(num: Decimal): string {
    if (!num.isFinite()) {
      throw new Error('NumberFormatter does not support Infinity or NaN.');
    }

    switch (this.notation) {
      case 'letter':
        return formatLetter(num, this.decimals);
      case 'scientific':
        return formatScientific(num, this.decimals);
      default:
        throw new Error(`Unknown notation type: ${this.notation}`);
    }
  }
}
