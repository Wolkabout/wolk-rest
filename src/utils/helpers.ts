/**
 * Find object key for provided object value
 * @param object Object to iterate through
 * @param value Value for which key is needed
 * @returns {String} key name
 */
export function getKeyByValue(object: any, value: number): string | undefined {
  return Object.keys(object).find(key => object[key] === value);
}

/**
 * Check whether or not current user is using browser with LocalStorage support
 * @returns {Boolean} true or false
 */
export function supportsLocalStorage(): boolean {
  try {
    return window && 'localStorage' in window && window['localStorage'] !== null;
  } catch (error) {
    return false;
  }
}
