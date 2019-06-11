import React from 'react'
import Board from './Board'

const width = 12
const height = 12

function App() {
  return (
    <div className="container mt-3">
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
