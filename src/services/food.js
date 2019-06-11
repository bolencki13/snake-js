import React from 'react'
import { isValidInput } from 'services/helper'

const HOCFoodService = origin => Component => {
  let result = isValidInput(origin.x + 1, 'origin.x')
  if (result) throw result
  result = isValidInput(origin.y + 1, 'origin.y')
  if (result) throw result

  class FoodService extends React.Component {
    state = {
      origin
    }

    setOrigin = newOrigin => {
      let result = isValidInput(newOrigin.x + 1, 'origin.x')
      if (result) throw result
      result = isValidInput(newOrigin.y + 1, 'origin.y')
      if (result) throw result

      this.setState({
        origin: newOrigin
      })
    }

    render() {
      return (
        <Component
          {...this.props}
          food={{
            ...this.state,
            setOrigin: this.setOrigin
          }}
        />
      )
    }
  }

  return FoodService
}

export default HOCFoodService
