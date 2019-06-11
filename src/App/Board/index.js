import React from 'react'
import PropTypes from 'prop-types'
import Cell from './Cell'
import { isValidInput, kMaxCells } from 'services/helper'
import './styles.scss'
import SnakeService, { SnakeServiceEvents } from 'services/snake'

class Board extends React.Component {
  generateCols = h => {
    let row = []
    for (let w = 0; w < this.props.size.width; w++) {
      const isSnakeCell =
        this.props.snake.squares.filter(square => {
          return square.x === w && square.y === h
        }).length > 0

      row.push(
        <Cell
          key={`w-${w}`}
          width={Math.ceil(kMaxCells / this.props.size.width)}
          isInFirstRow={h === 0}
        >
          {isSnakeCell ? <div className="snake" /> : null}
        </Cell>
      )
    }

    return row
  }

  componentDidMount() {
    this.board.focus()
  }

  render() {
    let board = []
    for (let h = 0; h < this.props.size.height; h++) {
      board.push(
        <div
          id="board-row"
          key={`h-${h}`}
          className="row no-gutters justify-content-center align-items-center"
        >
          {this.generateCols(h)}
        </div>
      )
    }

    return (
      <div ref={el => (this.board = el)} {...SnakeServiceEvents} tabIndex="1">
        {board}
      </div>
    )
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
  }).isRequired,
  snake: PropTypes.shape({
    squares: PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
      })
    ).isRequired
  }).isRequired
}

export default SnakeService({
  x: 0,
  y: 0
})(Board)
