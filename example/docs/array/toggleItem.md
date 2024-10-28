# toggleItem

Add an item to an array if it does not exist, otherwise remove it
from the array

```ts
function toggleItem<T>(arr: Array<T>, item: T): T[];
```

### Usage

```ts
import { toggleItem } from 'rattail'

const arr = [1, 2, 3, 4]
console.log(toggleItem(arr, 2)) // [1, 3, 4]
console.log(toggleItem(arr, 5)) // [1, 3, 4, 5]
```

### Arguments

| Arg | Description |
| --- | ----------- |
| `arr` | array |
| `item` | item to be toggled |

### Returns

The array after toggling the item