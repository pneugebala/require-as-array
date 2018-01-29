const reqArray = require('../src')

const validPath = './test/testModules'
const invalidPath = './test/someModules'

describe("basic", function() {
  it("should return valid module array synchronously", function(done) {
    try {
      const result = reqArray(validPath)
      if (result.length === 2)
        done()
      else
        done(new Error('Wrong result!'))
    } catch (e) {
      done(e)
    }
  })
  it("should return valid module array asynchronously", function(done) {
    try {
      reqArray(validPath, (err, result) => {
        if (err) {
          done(err)
        } else {
          if (result.length === 2)
            done()
          else
            done(new Error('Wrong result!'))
        }
      })
    } catch (e) {
      done(e)
    }
  })
  it("should throw error by requiring with invalid path synchronously", function(done) {
    try {
      const result = reqArray(invalidPath)
      done(new Error('No error thrown!'))
    } catch (e) {
      done()
    }
  })
  it("should throw error by requiring with invalid path asynchronously", function(done) {
    try {
      reqArray(invalidPath, (err, result) => {
        if (err)
          done()
        else
          done(new Error('No error thrown!'))
      })
    } catch (e) {
      done(e)
    }
  })
})