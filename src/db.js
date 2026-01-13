const fs = require("fs");
const path = require("path");

/**
 * Lightweight JSON database that reads/writes on demand without persistent memory caching.
 * Unlike simple-json-db, this doesn't keep data in memory between operations.
 */
class LightDB {
  /**
   * Creates a new LightDB instance.
   * @param {string} filePath - Path to the JSON file for storage.
   */
  constructor(filePath) {
    this.filePath = filePath;
    this._ensureFile();
  }

  /**
   * Ensures the database file exists, creating it with an empty object if not.
   * @private
   */
  _ensureFile() {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, "{}", "utf8");
    }
  }

  /**
   * Reads and parses the database file.
   * @private
   * @returns {Object} The parsed JSON data.
   */
  _read() {
    try {
      const data = fs.readFileSync(this.filePath, "utf8");
      return JSON.parse(data);
    } catch {
      return {};
    }
  }

  /**
   * Writes data to the database file.
   * @private
   * @param {Object} data - The data to write.
   */
  _write(data) {
    fs.writeFileSync(this.filePath, JSON.stringify(data), "utf8");
  }

  /**
   * Retrieves a value by key from the database.
   * @param {string} key - The key to retrieve.
   * @returns {*} The value associated with the key, or undefined if not found.
   */
  get(key) {
    const data = this._read();
    return data[key];
  }

  /**
   * Sets a key-value pair in the database.
   * @param {string} key - The key to set.
   * @param {*} value - The value to store.
   */
  set(key, value) {
    const data = this._read();
    data[key] = value;
    this._write(data);
  }

  /**
   * Deletes a key from the database.
   * @param {string} key - The key to delete.
   * @returns {boolean} True if the key existed and was deleted, false otherwise.
   */
  delete(key) {
    const data = this._read();
    if (key in data) {
      delete data[key];
      this._write(data);
      return true;
    }
    return false;
  }

  /**
   * Checks if a key exists in the database.
   * @param {string} key - The key to check.
   * @returns {boolean} True if the key exists, false otherwise.
   */
  has(key) {
    const data = this._read();
    return key in data;
  }
}

module.exports = LightDB;
