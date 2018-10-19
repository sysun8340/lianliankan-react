import React, { Component } from 'react'
import '../styles/linkLine.css'

class LinkLine extends Component {
  render() {
    const { linkablePoints } = this.props
    const lines = linkablePoints.map(point => {
      const x = 50 * point[0] + 25 + 5 * point[0] + 67
      const y = 50 * point[1] + 25 + 5 * point[1] + 9
      return `${x},${y}`
    }).join(' ')
    
    return (
      <div>
        <svg className='lines'>
          <polyline points={lines}
            style={{fill: 'transparent', stroke: 'red', strokeWidth: 2, strokeLinejoin: 'round'}} />
        </svg>
      </div>
    )
  }
}

export default LinkLine