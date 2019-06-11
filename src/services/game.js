import React from 'react'

const HOCGameService = Component => {
  class GameService extends React.Component {
    state = {
      isPlaying: true
    }

    setPlaying = newPlaying => {
      if (typeof newPlaying !== 'boolean')
        this.setState({
          isPlaying: newPlaying
        })
    }

    render() {
      return (
        <Component
          {...this.props}
          game={{
            ...this.state,
            setPlaying: this.setPlaying
          }}
        />
      )
    }
  }

  return GameService
}

export default HOCGameService
