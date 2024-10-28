# isArray

Determine whether the input value is an array

```ts
function isArray(val: unknown): val is Array<any>;
```

### Usage

```ts
import { isArray } from 'rattail'

isArray([1, 2, 3]) // return true
isArray('rattail') // return false
```

### Arguments

| Arg | Description |
| --- | ----------- |
| `val` | any value |

### Returns

boolean