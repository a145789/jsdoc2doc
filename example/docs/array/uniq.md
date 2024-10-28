# uniq

Remove duplicate elements from the array

```ts
function uniq<T>(arr: T[]): any[];
```

### Usage

```ts
import { uniq } from 'rattail'

const arr = [1, 4, 4, 5, 6, 6]
console.log(uniq(arr)) // [1, 5]
```

### Arguments

| Arg | Description |
| --- | ----------- |
| `arr` | array |

### Returns

The array after deduplication