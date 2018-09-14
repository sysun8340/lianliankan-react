import React, { Component } from 'react'
import '../styles/linkLine.css'

class LinkLine extends Component {
  render() {
    const { linkablePoints } = this.props
    console.log(linkablePoints)
    const lines = linkablePoints.map(point => {
      const x = 50 * point[0] + 25 + 5 * point[0] + 67
      const y = 50 * point[1] + 25 + 5 * point[1] + 15
      return `${x},${y}`
    }).join(' ')
    console.log(lines)
    return (
      <div>
        <svg className='lines' viewBox='0, 0, 100%, 100%'>
          <polyline points={lines}
            style={{fill: 'transparent', stroke: 'red', strokeWidth: 2, strokeLinejoin: 'round'}} />
        </svg>
      </div>
    )
  }
}

export default LinkLine