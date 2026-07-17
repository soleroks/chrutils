/**
 * Chariot Development Utilities
 * Version: 1.3
 */

const fs = require("fs");
const path = require("path");

module.exports = {
  randomizeAnArray(array) {
    if (!Array.isArray(array) || array.length === 0) return null;
    return array[Math.floor(Math.random() * array.length)];
  },

  selectBetween(min, max) {
    if (typeof min !== "number" || typeof max !== "number") return null;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  type_validate(parameter, expectedType) {
    return typeof parameter === expectedType;
  },

  randomNumberSpecifiedLength(length) {
    let rand = "";
    for (let i = 0; i < length; i++) {
      const rndN = Math.floor(Math.random() * 10);
      rand += rndN;
    }
    return rand;
  },

  updateJSON_field_specified(filePath, field, value) {
    const p = path.resolve(process.cwd(), filePath);
    const jsonData = JSON.parse(fs.readFileSync(p, "utf-8"));
    jsonData[field] = value;
    fs.writeFileSync(p, JSON.stringify(jsonData, null, 2));
  },

  CHRKV_read(relativePath) {
    const filePath = path.join(process.cwd(), relativePath);
    const lines = fs.readFileSync(filePath, "utf-8").split("\n");
    const result = {};

    for (const line of lines) {
      if (!line.trim() || line.trim().startsWith("#")) continue;
      const [key, value] = line.split("=");
      if (key && value) result[key.trim()] = value.trim();
    }

    return result;
  },

  safeJSONParse(str, fallback = null) {
    try {
      return JSON.parse(str);
    } catch {
      return fallback;
    }
  },

  deepClone(obj) {
    return structuredClone
      ? structuredClone(obj)
      : JSON.parse(JSON.stringify(obj));
  },

  isEmptyObject(obj) {
    return obj && typeof obj === "object" && Object.keys(obj).length === 0;
  },

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },

  clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  },

  uniqueArray(arr) {
    return Array.isArray(arr) ? [...new Set(arr)] : [];
  },

  fileExists(filePath) {
    try {
      fs.accessSync(filePath);
      return true;
    } catch {
      return false;
    }
  },

  ensureDir(dirPath) {
    fs.mkdirSync(dirPath, { recursive: true });
  },

  readJSON(filePath, fallback = null) {
    try {
      return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } catch {
      return fallback;
    }
  },

  writeJSON(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  },

  isDefined(val) {
    return val !== undefined && val !== null;
  },

  isNumber(val) {
    return typeof val === "number" && !Number.isNaN(val);
  },

  isString(val) {
    return typeof val === "string";
  },

  isBoolean(val) {
    return typeof val === "boolean";
  },

  isFunction(val) {
    return typeof val === "function";
  },

  isPromise(val) {
    return !!val && typeof val.then === "function";
  },

  capitalize(str) {
    if (typeof str !== "string" || !str.length) return str;
    return str[0].toUpperCase() + str.slice(1);
  },

  lowerFirst(str) {
    if (typeof str !== "string" || !str.length) return str;
    return str[0].toLowerCase() + str.slice(1);
  },

  slugify(str) {
    if (typeof str !== "string") return "";
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  },

  truncate(str, length) {
    if (typeof str !== "string") return str;
    if (str.length <= length) return str;
    return str.slice(0, length) + "...";
  },

  chunkArray(arr, size) {
    if (!Array.isArray(arr) || size <= 0) return [];
    const res = [];
    for (let i = 0; i < arr.length; i += size) {
      res.push(arr.slice(i, i + size));
    }
    return res;
  },

  flattenArray(arr) {
    return Array.isArray(arr) ? arr.flat(Infinity) : [];
  },

  removeDuplicates(arr) {
    return Array.isArray(arr) ? [...new Set(arr)] : [];
  },

  shuffleArray(arr) {
    if (!Array.isArray(arr)) return [];
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  },

  pick(obj, keys = []) {
    if (!obj || typeof obj !== "object") return {};
    return keys.reduce((acc, k) => {
      if (k in obj) acc[k] = obj[k];
      return acc;
    }, {});
  },

  omit(obj, keys = []) {
    if (!obj || typeof obj !== "object") return {};
    const res = { ...obj };
    for (const k of keys) delete res[k];
    return res;
  },

  deepFreeze(obj) {
    Object.freeze(obj);
    for (const key in obj) {
      if (
        obj[key] &&
        typeof obj[key] === "object" &&
        !Object.isFrozen(obj[key])
      ) {
        this.deepFreeze(obj[key]);
      }
    }
    return obj;
  },

  nowUnix() {
    return Math.floor(Date.now() / 1000);
  },

  formatDateISO(date = new Date()) {
    return date.toISOString();
  },

  elapsed(startMs) {
    return Date.now() - startMs;
  },

  isNode() {
    return typeof process !== "undefined" && !!process.versions?.node;
  },

  env(key, fallback = null) {
    return process.env[key] ?? fallback;
  },

  readText(filePath) {
    return fs.readFileSync(filePath, "utf-8");
  },

  writeText(filePath, data) {
    fs.writeFileSync(filePath, data);
  },

  appendText(filePath, data) {
    fs.appendFileSync(filePath, data);
  },

  deleteFile(filePath) {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  },
};
