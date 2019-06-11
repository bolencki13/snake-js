import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

function SnakeBox(props) {
  return (
    <div className={`snake ${props.isHead ? 'head' : ''} ${props.direction}`} />
  )
}

SnakeBox.propTypes = {
  isHead: PropTypes.bool,
  direction: PropTypes.oneOf(['right', 'left', 'up', 'down']).isRequired
}

export default SnakeBox
