# isString

Determine whether the input value is a string

```ts
function isString(str: unknown): str is string;
```

### Usage

```ts
import { isString } from 'rattail'

isString('rattail') // return true
isString(123) // return false
```

### Arguments

| Arg | Description |
| --- | ----------- |
| `str` | any value |

### Returns

boolean