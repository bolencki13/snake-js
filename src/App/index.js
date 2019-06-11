import React from 'react'
import Board from './Board'

const width = 12
const height = 12

function App() {
  return (
    <div className="container">
      <Board
        size={{
          width,
          height
        }}
      />
    </div>
  )
}

export default App
