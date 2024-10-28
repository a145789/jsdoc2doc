# normalizeToArray

Convert a value to an array

```ts
function normalizeToArray<T>(value: T | T[]): T | (T | T[])[];
```

### Usage

```ts
import { normalizeToArray } from 'rattail'

const value = 1
console.log(normalizeToArray(value)) // [1]

const value2 = [1, 2, 3]
console.log(normalizeToArray(value2)) // [1, 2, 3]
```

### Arguments

| Arg | Description |
| --- | ----------- |
| `value` | value |

### Returns

array