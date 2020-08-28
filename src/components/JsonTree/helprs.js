import hash from 'object-hash';

/**
 * Calculates object hash and returns it
 * @param {object} object
 * @returns {string} The hash
 */
// Cache Layer
const objectHashCache = new Map();

function calculateHash(object = {}) {
  // Retrieve from
  let cachedHash = objectHashCache.get(object);
  // Return if the object is cached
  if (cachedHash) {
    return cachedHash;
  }
  // Calculate object hash
  let objectHash = hash(object);
  // Store
  objectHashCache.set(object, objectHash);
  // Return
  return objectHash;
}

/**
 * Returns the HTML-friendly value
 * @param {any} val
 * @returns {string|number}
 */
function toPrintableValue(val) {
  if (typeof val === "number") {
    return val;
  }
  if (typeof val === "boolean") {
    return "" + val;
  }
  return `${val}`;
}

/**
 * Checks if the value is printable (primitive)
 * @param {any} val
 */
function isValuePrintable(val) {
  return ["string", "number", "boolean"].includes(typeof val) || val === null;
}


/**
 * Checks if the value is printable (primitive)
 * @param {any} val
 */
function toValueType(val) {
  if (Array.isArray(val)) {
    return 'array';
  }
  if (val === null) {
    return 'null';
  }
  return typeof val;
}

/**
 * Checks if the object is empty === {}
 * @param {object} obj
 * @returns {boolean}
 */
function isObjectEmpty(obj) {
  return !Object.keys(obj).length;
}

export default {
  toValueType,
  calculateHash,
  isObjectEmpty,
  isValuePrintable,
  toPrintableValue,
}