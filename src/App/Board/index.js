import React from 'react'
import PropTypes from 'prop-types'
import Cell from './Cell'
import { isValidInput, kMaxCells } from 'services/helper'

class Board extends React.Component {
  generateCols = h => {
    let row = []
    for (let w = 0; w < this.props.size.width; w++) {
      row.push(
        <Cell
          key={`w-${w}`}
          width={Math.ceil(kMaxCells / this.props.size.width)}
          isInFirstRow={h === 0}
        >
          {`${h}-${w}`}
        </Cell>
      )
    }

    return row
  }

  render() {
    let board = []
    for (let h = 0; h < this.props.size.height; h++) {
      board.push(
        <div
          id="board-row"
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

Board.propTypes = {
  size: PropTypes.shape({
    width: function(props, propName) {
      return isValidInput(props[propName], 'size.width')
    },
    height: function(props, propName) {
      return isValidInput(props[propName], 'size.height')
    }
  }).isRequired
}

export default Board
