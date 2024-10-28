# uniqBy

Remove duplicate elements from the array based on a comparison function

```ts
function uniqBy<T>(arr: T[], fn: (a: T, b: T) => boolean): T[];
```

### Usage

```ts
import { uniqBy } from 'rattail'

const arr = [{ id: 1 }, { id: 2 }, { id: 1 }]
console.log(uniqBy(arr, (a, b) => a.id === b.id)) // [{ id: 1 }, { id: 2 }]
```

### Arguments

| Arg | Description |
| --- | ----------- |
| `arr` | array |
| `fn` | compare function |

### Returns

The array after deduplication