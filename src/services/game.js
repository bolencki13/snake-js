import React from 'react'

const HOCGameService = Component => {
  class GameService extends React.Component {
    state = {
      isPlaying: true,
      hasWon: true
    }

    setPlaying = newPlaying => {
      if (typeof newPlaying !== 'boolean') {
        throw new Error('"setPlaying" takes a boolean value.')
      }

      return this.setState({
        isPlaying: newPlaying,
        hasWon: false
      })
    }

    setWon = () => {
      return this.setPlaying(false).then(() =>
        this.setState({
          hasWon: true
        })
      )
    }

    render() {
      return (
        <Component
          {...this.props}
          game={{
            ...this.state,
            setPlaying: this.setPlaying,
            setWon: this.setWon
          }}
        />
      )
    }
  }

  return GameService
}

export default HOCGameService
