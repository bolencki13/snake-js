import React from 'react'
import ArrowKeysReact from 'arrow-keys-react'
import PropTypes from 'prop-types'
import { isValidInput, kTimeInterval } from 'services/helper'

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
        direction: 'right'
      }

      ArrowKeysReact.config({
        left: () => this.setState({ direction: 'left' }),
        right: () => this.setState({ direction: 'right' }),
        up: () => this.setState({ direction: 'up' }),
        down: () => this.setState({ direction: 'down' })
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
      const head = squares[0]

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
