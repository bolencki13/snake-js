import React from 'react'
import PropTypes from 'prop-types'

export const kMinCells = 1
export const kMaxCells = 12

class Board extends React.Component {
  generateCols = h => {
    let row = []
    for (let w = 0; w < this.props.size.width; w++) {
      row.push(
        <div
          key={`w-${w}`}
          className={`col-${Math.ceil(kMaxCells / this.props.size.width)}`}
          styles={{ backgroundColor: w % 2 === 0 ? 'red' : 'blue' }}
        >
          {`${h}-${w}`}
        </div>
      )
    }

    return row
  }

  render() {
    let board = []
    for (let h = 0; h < this.props.size.height; h++) {
      board.push(
        <div
          key={`h-${h}`}
          className="row justify-content-center align-items-center"
        >
          {this.generateCols(h)}
        </div>
      )
    }

    return board
  }
}

const isValidInput = (input, name) => {
  if (!input) {
    return new Error(`"${name}" is required.`)
  }
  if (typeof input !== 'number') {
    return new Error(`"${name}" must be a number.`)
  }
  if (input < kMinCells || input > kMaxCells) {
    return new Error(`"${name}" must be inclusively between 1-12.`)
  }
}

Board.propTypes = {
  size: PropTypes.shape({
    width: function(props, propName) {
      return isValidInput(props[propName])
    },
    height: function(props, propName) {
      return isValidInput(props[propName])
    }
  }).isRequired
}

export default Board
