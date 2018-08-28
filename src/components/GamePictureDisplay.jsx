import React, { Component } from 'react'
import '../styles/gamePictureDisplay.css'

class GamePictureDisplay extends Component {

  static defaultProps = {
    matrix: [
      [0, 0, 0, 0, 0, 0],
      [0, 1, 1, 2, 2, 0],
      [0, 3, 3, 4, 4, 0],
      [0, 5, 5, 6, 6, 0],
      [0, 7, 7, 8, 8, 0],
      [0, 0, 0, 0, 0, 0]
    ]
  }
  render() {
    const { matrix } = this.props
    return (
      <div className='pictures'>
        {
          matrix.map((row, index) => <div key={index} className='row'>
            {
              row.map((item, index) => <div key={index} className={`item-${item} item`}></div>)
            }
          </div>)
        }
      </div>
    )
  }
}

export default GamePictureDisplay