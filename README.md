# incremental-number-formatter

A TypeScript library for formatting large numbers in incremental games. Supports both scientific notation and letter notation (e.g., `1k`, `1m`, `1b`, `1aa`, `1zz`). It also handles extremely large numbers with precision using `decimal.js`.

## Installation

Install the library via npm:

```bash
npm install incremental-number-formatter
```

## Usage
### Importing the Library

```typescript
import { NumberFormatter } from 'incremental-number-formatter';
import Decimal from 'decimal.js';
```

### Creating a Formatter

First, create a reusable formatter with options:

```typescript
const formatter = new NumberFormatter({
  notation: 'letter', // 'scientific' or 'letter'
  decimals: 2,        // Number of decimal places to display
});
```

### Formatting Numbers

```typescript
const num = new Decimal(1234567); // 1,234,567
console.log(formatter.format(num)); // "1.23m" (letter notation)
```

Scientific notation example:

```typescript
const sciFormatter = new NumberFormatter({
  notation: 'scientific',
  decimals: 2,
});
console.log(sciFormatter.format(num)); // "1.23e+6"
```

## The Letter Formatter

This format is pretty common in incremental games. For "small" numbers, the suffix is k, m, b, or t. Then for "large" numbers, the suffix becomes aa, ab, ..., zz.

If the number exceeds zz (e.g., beyond 1e2042), the library throws an error:

```typescript
try {
  console.log(formatter.format(new Decimal('1e2043')));
} catch (error) {
  console.error(error.message); // "Exponent too large: ..."
}
```

## Development

### Installing

```bash
npm install
```

### Building the Library

Run the TypeScript compiler:

```bash
npm run build
```

### Testing

Run the tests with Jest:

```bash
npm test
```

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with a detailed description of your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

