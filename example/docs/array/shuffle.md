# shuffle

Randomly sort the array

```ts
function shuffle<T>(arr: T[]): T[];
```

### Usage

```ts
import { shuffle } from 'rattail'

const arr = [1, 2, 3, 4, 5]
console.log(shuffle(arr)) // [3, 1, 4, 5, 2]
```

### Arguments

| Arg | Description |
| --- | ----------- |
| `arr` | array |

### Returns

The array after shuffling