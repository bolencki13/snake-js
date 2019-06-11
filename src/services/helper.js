export const kMinCells = 1
export const kMaxCells = 12

export const isValidInput = (input, name) => {
  if (input === undefined || input === null) {
    return new Error(`"${name}" is required.`)
  }
  if (typeof input !== 'number') {
    return new Error(`"${name}" must be a number.`)
  }
  if (input < kMinCells || input > kMaxCells) {
    return new Error(`"${name}" must be inclusively between 1-12.`)
  }
}
