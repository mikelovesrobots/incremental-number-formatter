import Decimal from "decimal.js";
import { formatLetter } from "../src/formatLetter";

describe("formatLetter", () => {
  it('formats zero as "0"', () => {
    expect(formatLetter(new Decimal(0), 2)).toBe("0");
  });

  it("formats numbers < 1000 without suffix", () => {
    expect(formatLetter(new Decimal(999), 2)).toBe("999.00");
  });

  it("formats 1000 => 1k", () => {
    expect(formatLetter(new Decimal(1000), 2)).toBe("1.00k");
  });

  it("formats 1e6 => 1m", () => {
    expect(formatLetter(new Decimal(1e6), 2)).toBe("1.00m");
  });

  it("formats 1e12 => 1t", () => {
    expect(formatLetter(new Decimal(1e12), 2)).toBe("1.00t");
  });

  it("formats 1e15 => 1.00aa", () => {
    expect(formatLetter(new Decimal(1e15), 2)).toBe("1.00aa");
  });

  it("formats 1e18 => 1.00ab", () => {
    expect(formatLetter(new Decimal(1e18), 2)).toBe("1.00ab");
  });

  it("formats negative big numbers with suffix", () => {
    expect(formatLetter(new Decimal(-1e18), 2)).toBe("-1.00ab");
  });

  it('1e2040 => exponent=680 => "zz"', () => {
    expect(formatLetter(new Decimal("1e2040"), 2)).toBe("1.00zz");
  });

  it("1e2042 => 100.00zz", () => {
    expect(formatLetter(new Decimal("1e2042"), 2)).toBe("100.00zz");
  });

  it('throws error beyond "zz"', () => {
    expect(() => {
      formatLetter(new Decimal("1e2043"), 2);
    }).toThrow(/Maximum supported two-letter suffix is "zz"/);
  });
});
