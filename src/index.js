const fs = require('fs')
const nPath = require('path')

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

function doSync (path) {
  const list = fs.readdirSync(path)
  const result = iterate(path, list)
  return result
}

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
