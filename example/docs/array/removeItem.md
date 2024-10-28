# removeItem

Remove an item from an array

```ts
function removeItem<T>(arr: Array<T>, item: T): any;
```

### Usage

```ts
import { removeItem } from 'rattail'

const arr = [1, 2, 3, 4]
console.log(removeItem(arr, 2)) // [1, 3, 4]
```

### Arguments

| Arg | Description |
| --- | ----------- |
| `arr` | array |
| `item` | item to be removed |

### Returns

The array after removing the item