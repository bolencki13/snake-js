import React from 'react'
import PropTypes from 'prop-types'
import { isValidInput } from 'services/helper'
import './styles.scss'

function Cell(props) {
  return (
    <div
      id="board-cell"
      className={`col-${props.width} ${
        props.isInFirstRow ? 'is-first-row' : ''
      }`}
    >
      {props.children}
    </div>
  )
}

Cell.propTypes = {
  width: function(props, propName) {
    return isValidInput(props[propName], 'width')
  },
  children: PropTypes.any,
  isInFirstRow: PropTypes.bool
}

export default Cell
