
const makeResponseCreator = name => async promise => {
  const response = await promise
  if (response === null) {
    return { success: false }
  }
  return { success: true, [name]: response }
}

module.exports = { makeResponseCreator }