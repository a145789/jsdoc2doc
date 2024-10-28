# isNumber

Determine whether the input value is a number

```ts
function isNumber(num: unknown): num is number;
```

### Usage

```ts
import { isNumber } from 'rattail'

isNumber(123) // return true
isNumber('rattail') // return false
```

### Arguments

| Arg | Description |
| --- | ----------- |
| `num` | any value |

### Returns

boolean