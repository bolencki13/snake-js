import React from 'react'
import ArrowKeysReact from 'arrow-keys-react'
import PropTypes from 'prop-types'
import {
  isValidInput,
  kTimeInterval,
  randomNumberBetween
} from 'services/helper'

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
        squares: [origin],
        direction: 'right',
        growOnNextTick: false
      }

      ArrowKeysReact.config({
        left: () => {
          if (this.state.direction !== 'right') {
            this.setState({ direction: 'left' })
          }
        },
        right: () => {
          if (this.state.direction !== 'left') {
            this.setState({ direction: 'right' })
          }
        },
        up: () => {
          if (this.state.direction !== 'down') {
            this.setState({ direction: 'up' })
          }
        },
        down: () => {
          if (this.state.direction !== 'up') {
            this.setState({ direction: 'down' })
          }
        }
      })
    }

    componentDidMount() {
      const intervalId = setInterval(this.timer, kTimeInterval)
      this.intervalId = intervalId
    }

    componentWillUnmount() {
      clearInterval(this.intervalId)
    }

    timer = () => {
      const squares = [...this.state.squares]
      const head = { ...squares[0] }

      for (let i = squares.length - 1; i > 0; i--) {
        squares[i] = { ...squares[i - 1] }
      }

      switch (this.state.direction) {
        case 'up':
          if (head.y > 0) {
            head.y = head.y - 1
          }
          break
        case 'down':
          if (head.y < this.props.size.height - 1) {
            head.y = head.y + 1
          }
          break
        case 'right':
          if (head.x < this.props.size.width - 1) {
            head.x = head.x + 1
          }
          break
        case 'left':
        default:
          if (head.x > 0) {
            head.x = head.x - 1
          }
      }
      squares[0] = head

      this.setState({
        squares
      })
    }

    componentDidUpdate(previousProps, previousState) {
      const head = this.state.squares[0]
      const food = this.props.food.origin

      if (food.x === head.x && food.y === head.y) {
        this.setState(state => {
          const tail = { ...state.squares[state.squares.length - 1] }
          return {
            squares: state.squares.concat(tail)
          }
        })
        this.props.food.setOrigin({
          x: randomNumberBetween(0, this.props.size.width),
          y: randomNumberBetween(0, this.props.size.height)
        })
      }
    }

    render() {
      return (
        <Component
          {...this.props}
          snake={this.state}
          score={this.state.squares.length - 1}
        />
      )
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
    }).isRequired,
    food: PropTypes.shape({
      origin: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
      }).isRequired,
      setOrigin: PropTypes.func.isRequired
    }).isRequired
  }

  return SnakeService
}

export default HOCSnakeService
