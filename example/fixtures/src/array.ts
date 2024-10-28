import { isArray } from "./general"

/**
 * Remove duplicate elements from the array
 *
 * @example
 * ```ts
 * import { uniq } from 'rattail'
 *
 * const arr = [1, 4, 4, 5, 6, 6]
 * console.log(uniq(arr)) // [1, 5]
 * ```
 *
 * @param arr array
 * @returns The array after deduplication
 */
export function uniq<T>(arr: T[]) {
  return [...new Set(arr)]
}

/**
 * Remove duplicate elements from the array based on a comparison function
 *
 * @example
 * ```ts
 * import { uniqBy } from 'rattail'
 *
 * const arr = [{ id: 1 }, { id: 2 }, { id: 1 }]
 * console.log(uniqBy(arr, (a, b) => a.id === b.id)) // [{ id: 1 }, { id: 2 }]
 * ```
 *
 * @param arr array
 * @param fn compare function
 * @returns The array after deduplication
 */
export function uniqBy<T>(arr: T[], fn: (a: T, b: T) => boolean): T[] {
  return arr.reduce((ret: T[], i: T) => {
    const index = ret.findIndex((j: T) => fn(i, j))

    if (index === -1) {
      ret.push(i)
    }

    return ret
  }, [])
}

/**
 * Convert a value to an array
 *
 * @example
 * ```ts
 * import { normalizeToArray } from 'rattail'
 *
 * const value = 1
 * console.log(normalizeToArray(value)) // [1]
 *
 * const value2 = [1, 2, 3]
 * console.log(normalizeToArray(value2)) // [1, 2, 3]
 * ```
 *
 * @param value value
 *
 * @returns array
 */
export function normalizeToArray<T>(value: T | T[]) {
  return isArray(value) ? value : [value]
}

/**
 * Remove an item from an array
 *
 * @example
 * ```ts
 * import { removeItem } from 'rattail'
 *
 * const arr = [1, 2, 3, 4]
 * console.log(removeItem(arr, 2)) // [1, 3, 4]
 * ```
 *
 * @param arr array
 * @param item item to be removed
 * @returns The array after removing the item
 */
export function removeItem<T>(arr: Array<T>, item: T) {
  if (arr.length) {
    const index: number = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Add an item to an array if it does not exist, otherwise remove it
 * from the array
 *
 * @example
 * ```ts
 * import { toggleItem } from 'rattail'
 *
 * const arr = [1, 2, 3, 4]
 * console.log(toggleItem(arr, 2)) // [1, 3, 4]
 * console.log(toggleItem(arr, 5)) // [1, 3, 4, 5]
 * ```
 *
 * @param arr array
 * @param item item to be toggled
 * @return The array after toggling the item
 */
export function toggleItem<T>(arr: Array<T>, item: T) {
  arr.includes(item) ? removeItem(arr, item) : arr.push(item)
  return arr
}

/**
 * Remove null or undefined elements from the array
 *
 * @example
 * ```ts
 * import { removeArrayBlank } from 'rattail'
 *
 * const arr = [1, null, 2, undefined, 3]
 * console.log(removeArrayBlank(arr)) // [1, 2, 3]
 * ```
 *
 * @param arr array
 * @returns The array after removing null or undefined elements
 */
export function removeArrayBlank<T>(arr: Array<T | null | undefined>) {
  return arr.filter((item) => item != null) as T[]
}

/**
 * Randomly sort the array
 *
 * @example
 * ```ts
 * import { shuffle } from 'rattail'
 *
 * const arr = [1, 2, 3, 4, 5]
 * console.log(shuffle(arr)) // [3, 1, 4, 5, 2]
 * ```
 *
 * @param arr array
 * @returns The array after shuffling
 */
export function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/**
 * Sum the elements of the array
 *
 * @example
 * ```ts
 * import { sum } from 'rattail'
 *
 * const arr = [1, 2, 3, 4, 5]
 * console.log(sum(arr)) // 15
 * console.log(sum([])) // 0
 * ```
 *
 * @param arr array
 * @returns The sum of the elements of the array
 */
export function sum(arr: number[]) {
  return arr.reduce((ret, val) => ret + val, 0)
}
