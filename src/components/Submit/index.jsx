import React from 'react'
import './submit.css'

export default ({ text = '提交', onClick, disabled = false }) => (
  <button
    onClick={onClick}
    className={`confirm__button--primary ${disabled ? 'confirm__button--disabled' : ''}`}
    disabled={disabled}
  >
    {text}
  </button>
)
