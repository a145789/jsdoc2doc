# isBoolean

Determine whether the input value is a boolean

```ts
const isBoolean: (bool: unknown) => bool is boolean;
```

### Usage

```ts
import { isBoolean } from 'rattail'

isBoolean(true) // return true
isBoolean('rattail') // return false
```

### Arguments

| Arg | Description |
| --- | ----------- |
| `bool` | any value |

### Returns

boolean