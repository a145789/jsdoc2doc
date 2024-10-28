# removeArrayBlank

Remove null or undefined elements from the array

```ts
function removeArrayBlank<T>(arr: Array<T | null | undefined>): T[];
```

### Usage

```ts
import { removeArrayBlank } from 'rattail'

const arr = [1, null, 2, undefined, 3]
console.log(removeArrayBlank(arr)) // [1, 2, 3]
```

### Arguments

| Arg | Description |
| --- | ----------- |
| `arr` | array |

### Returns

The array after removing null or undefined elements