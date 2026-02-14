# chrutils

A lightweight Node.js utility library providing time manipulation, logging, and general-purpose helpers. Built with both JavaScript and TypeScript implementations for flexibility and performance.

## Features

- **Time Utilities** – Time conversions, epoch/Unix timestamps, duration calculations
- **Logging System** – Console logging (JS) and Discord webhook integration (TS)
- **50+ Helper Functions** – Arrays, objects, strings, files, type validation, and more
- **Silent Error Handling** – Functions return safe defaults instead of throwing exceptions
- **Dual Language** – Pure JavaScript (no dependencies) and TypeScript (with moment.js) versions

## Requirements

- **Node.js 22.x** (tested and supported)
- Earlier versions may have incomplete or unstable support

## Installation

```bash
npm install chrutils
# or
yarn add chrutils
```

## Quick Start

### Time Utilities

**JavaScript (Native):**

```javascript
const time = require("./javascript/time.js");

const unixNow = time.now_unix(); // Current Unix timestamp
const isoNow = time.now_iso(); // Current ISO string
const converted = time.to_date(1692561600); // Convert timestamp to Date
```

**TypeScript (moment.js):**

```typescript
import {
  convertTimestampToEpochDate,
  convertToHumanDateAsObjects,
} from "./typescript/time.ts";

const epoch = await convertTimestampToEpochDate("2024-02-14");
const human = await convertToHumanDateAsObjects(1707907200);
// { day: 0, hour: 5, minute: 30, second: 45 }
```

### Logging

**JavaScript Console Logger:**

```javascript
const Baselogger = require("./javascript/baselogger.js");
const logger = new Baselogger("MyApp");

logger.out("Info message"); // Standard log
logger.alert("Warning message"); // Warning level
logger.native_error("Error"); // Error level
logger.dev("Debug info"); // Debug level
```

**TypeScript Discord Logger:**

```typescript
import ChariotBaselogger from "./typescript/useBaselogger.ts";

const logger = new ChariotBaselogger("MyService");
await logger.log("Application started"); // Sends to Discord webhook + console
```

### Utilities

```javascript
const utils = require("./javascript/chariot@util.js");

// Type checking
utils.isNumber(42); // true
utils.isString("hello"); // true
utils.isDefined(null); // false

// Array operations
utils.uniqueArray([1, 2, 2, 3]); // [1, 2, 3]
utils.shuffleArray([1, 2, 3, 4, 5]); // Randomized array
utils.chunkArray([1, 2, 3, 4], 2); // [[1, 2], [3, 4]]

// String utilities
utils.slugify("Hello World!"); // 'hello-world'
utils.capitalize("hello"); // 'Hello'
utils.truncate("Long text", 5); // 'Long ...'

// File operations
const data = utils.readJSON("./config.json", {}); // Reads JSON or returns default
utils.writeJSON("./output.json", { key: "value" }); // Writes with formatting
utils.fileExists("./myfile.txt"); // true/false

// Object operations
utils.pick({ a: 1, b: 2, c: 3 }, ["a", "c"]); // { a: 1, c: 3 }
utils.omit({ a: 1, b: 2, c: 3 }, ["b"]); // { a: 1, c: 3 }

// Timing
const start = Date.now();
// ... do work ...
const duration = utils.elapsed(start); // Milliseconds elapsed

// Control flow
await utils.sleep(1000); // Wait 1 second
```

## Module Structure

```
chrutils/
├── javascript/
│   ├── chariot@util.js      # 200+ utility functions
│   ├── time.js              # Native time operations
│   ├── chariot@time.js      # Hour/minute constants
│   └── baselogger.js        # Console logging
├── typescript/
│   ├── time.ts              # moment.js time operations (async)
│   └── useBaselogger.ts     # Discord webhook logging
└── README.md
```

### JavaScript vs TypeScript

| Feature         | JavaScript              | TypeScript                  |
| --------------- | ----------------------- | --------------------------- |
| **Time**        | Native, no dependencies | moment.js, async functions  |
| **Logging**     | Console only            | Discord webhook integration |
| **Performance** | Faster                  | Feature-rich                |
| **Use Case**    | Performance-critical    | Discord bots, webhooks      |

## API Reference

### chariot@util.js (JavaScript)

- **Type Checks**: `isDefined`, `isNumber`, `isString`, `isBoolean`, `isFunction`, `isPromise`
- **Arrays**: `uniqueArray`, `removeDuplicates`, `shuffleArray`, `chunkArray`, `flattenArray`
- **Objects**: `pick`, `omit`, `isEmptyObject`, `deepClone`, `deepFreeze`
- **Strings**: `capitalize`, `lowerFirst`, `slugify`, `truncate`
- **Files**: `readJSON`, `writeJSON`, `readText`, `writeText`, `appendText`, `deleteFile`, `fileExists`, `ensureDir`
- **Time**: `nowUnix`, `formatDateISO`, `elapsed`
- **Random**: `randomizeAnArray`, `selectBetween`, `randomNumberSpecifiedLength`, `shuffleArray`
- **Utilities**: `clamp`, `sleep`, `safeJSONParse`, `env`

### time.js (JavaScript)

- `to_date()` – Convert timestamp or string to Date
- `to_unix()` – Convert Date to Unix timestamp
- `from_unix()` – Convert Unix timestamp to Date
- `now_unix()` – Current Unix timestamp
- `now_iso()` – Current ISO string
- Constants: `SECOND`, `MINUTE`, `HOUR`, `DAY`, `WEEK`

### time.ts (TypeScript)

- `convertTimestampToEpochDate()` – Async timestamp conversion
- `convertToHumanDateAsObjects()` – Duration in days/hours/minutes/seconds
- `reallyIsBetween()` – Check if now is between two timestamps
- `pickARandom2Dates()` – Generate random date range

## Error Handling

All utility functions return safe defaults on error instead of throwing:

```javascript
utils.readJSON("./missing.json"); // Returns null (or provided fallback)
utils.readJSON("./bad.json", {}); // Returns {} on parse error
utils.uniqueArray(null); // Returns []
utils.capitalize(123); // Returns 123 unchanged
```

This pattern prevents crashes and makes the library production-safe.

## Contributing

When adding new utilities:

1. Follow the error-handling pattern (return safe defaults)
2. Add type validation before operations
3. Include JSDoc comments
4. Update version number in module header
5. Consider both JS and TS implementations when applicable

## License

MIT

## Support

- **Node.js 22.x** – Tested and fully supported
- **Earlier versions** – Use at your own risk; may have compatibility issues
