/**
 * Determine whether the input value is a string
 *
 * @example
 * ```ts
 * import { isString } from 'rattail'
 *
 * isString('rattail') // return true
 * isString(123) // return false
 * ```
 *
 * @param str any value
 * @returns boolean
 */
export function isString(str: unknown): str is string {
  return typeof str === "string"
}

/**
 * Determine whether the input value is a number
 *
 * @example
 * ```ts
 * import { isNumber } from 'rattail'
 *
 * isNumber(123) // return true
 * isNumber('rattail') // return false
 * ```
 *
 * @param num any value
 * @returns boolean
 */
export function isNumber(num: unknown): num is number {
  return typeof num === "number"
}

/**
 * Determine whether the input value is a boolean
 *
 * @example
 * ```ts
 * import { isBoolean } from 'rattail'
 *
 * isBoolean(true) // return true
 * isBoolean('rattail') // return false
 * ```
 *
 * @param bool any value
 * @returns boolean
 */
export const isBoolean = (bool: unknown): bool is boolean =>
  typeof bool === "boolean"

/**
 * Determine whether the input value is an array
 *
 * @example
 * ```ts
 * import { isArray } from 'rattail'
 *
 * isArray([1, 2, 3]) // return true
 * isArray('rattail') // return false
 * ```
 *
 * @param val any value
 * @returns boolean
 */
export function isArray(val: unknown): val is Array<any> {
  return Array.isArray(val)
}
