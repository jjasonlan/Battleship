import React from 'react'
import './Cell.css'

const Cell = ({ row, col, ships, attempts }) => {
  const shotFired = attempts[row][col]
  const marker = !shotFired ? null
    : ships[row][col] ? 'hit'
    : 'miss'
  return (
    <div className={`cell ${marker}`}>
      ({row}, {col})
    </div>
  )
}

export default Cell;
