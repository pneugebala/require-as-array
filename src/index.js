const fs = require('fs')
const nPath = require('path')

/**
 * Starts the requiring process
 *
 * @param {string} path - The path to use
 * @param {function} cb - Callback for aynchronous operation result (optional)
 * @return {object} Result for synchronously required modules
 */
function start (path, cb) {
  if (typeof cb === 'undefined') {
    if (typeof path !== 'string')
      throw new Error('Path needs to be a string!')
    const result = doSync(path)
    return result
  } else {
    if (typeof path !== 'string')
      cb(new Error('Path needs to be a string!'), null)
    else
      doAsync(path, cb)
  }
}

/**
 * Requires all modules with given path synchronously
 *
 * @param {string} path - The path to use
 * @return {object} List of required modules
 */
function doSync (path) {
  const list = fs.readdirSync(path)
  const result = iterate(path, list)
  return result
}

/**
 * Requires all modules with given path asynchronously
 *
 * @param {string} path - The path to use
 * @param {function} cb - Callback for result
 */
function doAsync (path, cb) {
  fs.readdir(path, (err, list) => {
    if (err) {
      cb(err, null)
    } else {
      const result = iterate(path, list)
      cb(false, result)
      try {
      } catch (e) {
        cb(e, null)
      }
    }
  })
}

/**
 * Iterates over module list and calls require
 *
 * @param {string} path - The path to use
 * @param {object} list - The list to use
 * @return {object} List of required modules
 */
function iterate (path, list) {
  const result = []
  let str = null
  for (let i = 0; i < list.length; i++) {
    str = nPath.resolve(nPath.join(path, list[i]))
    result.push(require(str))
  }
  return result
}

module.exports = start
