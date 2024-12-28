import Decimal from "decimal.js";

const BASE_SUFFIXES = ["k", "m", "b", "t"];

/**
 * Formats a Decimal number using letter notation.
 * Supports only:
 *  - 1e3 => "k"
 *  - 1e6 => "m"
 *  - 1e9 => "b"
 *  - 1e12 => "t"
 *  - 1e15..1e(12 + 676*3) => "aa".."zz"
 * Throws error if exponent is beyond that.
 */
export function formatLetter(num: Decimal, decimals: number): string {
  // Handle zero
  if (num.isZero()) {
    return "0";
  }

  const absNum = num.abs();
  const sign = num.isNegative() ? "-" : "";

  // exponent => how many times we've crossed 1,000
  // e.g. 1e3 => exponent=1; 1e6 => exponent=2
  const exponent = Math.floor(absNum.log(1000).toNumber());

  // If exponent <= 0 => <1k => just format as plain
  if (exponent <= 0) {
    return `${sign}${absNum.toFixed(decimals)}`;
  }

  // Compute the 'baseValue' (leading digits)
  const baseValue = absNum.dividedBy(new Decimal(1000).pow(exponent));

  // 1..4 => k, m, b, t
  if (exponent <= BASE_SUFFIXES.length) {
    const suffix = BASE_SUFFIXES[exponent - 1];
    return `${sign}${baseValue.toFixed(decimals)}${suffix}`;
  }

  // If exponent > 4 => two-letter suffix
  // index=0 => "aa", index=1 => "ab", etc.
  const beyondIndex = exponent - (BASE_SUFFIXES.length + 1);
  // e.g., exponent=5 => beyondIndex=0 => "aa"
  //       exponent=6 => beyondIndex=1 => "ab"
  // We'll support up to index=675 => "zz" (that is 26*26=676 combos).

  if (beyondIndex > 675) {
    throw new Error(
      `Exponent too large: ${exponent}. Maximum supported two-letter suffix is "zz".`
    );
  }

  const alphaSuffix = getTwoLetterSuffix(beyondIndex);
  return `${sign}${baseValue.toFixed(decimals)}${alphaSuffix}`;
}

/**
 * Returns a two-letter suffix given an index in [0..675].
 *  - 0 => "aa"
 *  - 1 => "ab"
 *  ...
 *  - 25 => "az"
 *  - 26 => "ba"
 *  ...
 *  - 675 => "zz"
 */
function getTwoLetterSuffix(index: number): string {
  const letters = "abcdefghijklmnopqrstuvwxyz";

  // Each suffix is exactly two letters:
  //   left char = index // 26
  //   right char = index % 26
  // Since index is in [0..675], left char is in [0..25].
  const left = Math.floor(index / 26);
  const right = index % 26;

  return letters[left] + letters[right];
}
