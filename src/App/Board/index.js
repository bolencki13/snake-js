import React from 'react'
import PropTypes from 'prop-types'
import Cell from './Cell'
import SnakeBox from './Cell/Snake'
import FoodBox from './Cell/Food'
import { isValidInput, kMaxCells } from 'services/helper'
import SnakeService, { SnakeServiceEvents } from 'services/snake'
import FoodService from 'services/food'
import GameService from 'services/game'

class Board extends React.Component {
  generateCols = h => {
    let row = []
    for (let w = 0; w < this.props.size.width; w++) {
      const isSnakeCell =
        this.props.snake.squares.filter(square => {
          return square.x === w && square.y === h
        }).length > 0
      const isFoodBox =
        this.props.food.origin.x === w && this.props.food.origin.y === h

      row.push(
        <Cell
          key={`w-${w}`}
          width={Math.ceil(kMaxCells / this.props.size.width)}
          isInFirstRow={h === 0}
        >
          {isSnakeCell ? <SnakeBox /> : isFoodBox ? <FoodBox /> : null}
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
  }).isRequired,
  food: PropTypes.shape({
    origin: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }).isRequired
  }).isRequired
}

export default GameService(
  FoodService({
    x: 5,
    y: 5
  })(
    SnakeService({
      x: 0,
      y: 0
    })(Board)
  )
)
