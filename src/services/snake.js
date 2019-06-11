import React from 'react'
import ArrowKeysReact from 'arrow-keys-react'
import PropTypes from 'prop-types'
import { isValidInput } from 'services/helper'

export const SnakeServiceEvents = ArrowKeysReact.events

const HOCSnakeService = origin => Component => {
  let result = isValidInput(origin.x + 1, 'origin.x')
  if (result) throw result
  result = isValidInput(origin.y + 1, 'origin.y')
  if (result) throw result

  class SnakeService extends React.Component {
    constructor() {
      super()

      this.state = {
        squares: [origin]
      }

      ArrowKeysReact.config({
        left: this.arrowLeft,
        right: this.arrowRight,
        up: this.arrowUp,
        down: this.arrowDown
      })
    }

    arrowLeft = () => {
      const squares = this.state.squares.map(square => {
        if (square.x > 0) {
          square.x = square.x - 1
        }
        return square
      })
      this.setState({
        squares
      })
    }

    arrowRight = () => {
      const squares = this.state.squares.map(square => {
        if (square.x < this.props.size.width - 1) {
          square.x = square.x + 1
        }
        return square
      })
      this.setState({
        squares
      })
    }

    arrowUp = () => {
      const squares = this.state.squares.map(square => {
        if (square.y > 0) {
          square.y = square.y - 1
        }
        return square
      })
      this.setState({
        squares
      })
    }

    arrowDown = () => {
      const squares = this.state.squares.map(square => {
        if (square.y < this.props.size.height - 1) {
          square.y = square.y + 1
        }
        return square
      })
      this.setState({
        squares
      })
    }

    render() {
      return <Component {...this.props} snake={this.state} />
    }
  }

  SnakeService.propTypes = {
    size: PropTypes.shape({
      width: function(props, propName) {
        return isValidInput(props[propName], 'size.width')
      },
      height: function(props, propName) {
        return isValidInput(props[propName], 'size.height')
      }
    }).isRequired
  }

  return SnakeService
}

export default HOCSnakeService
