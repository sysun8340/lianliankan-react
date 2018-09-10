import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../styles/gamePictureDisplay.css'
import cx from 'classnames'
import { isLinkable } from '../utils'

class GamePictureDisplay extends Component {

  static propTypes = {
    matrix: PropTypes.array,
    selected: PropTypes.array,
    current: PropTypes.array,
    leftedTime: PropTypes.number,
    score: PropTypes.number,
    isSelected: PropTypes.func,
  }
  static defaultProps = {
    matrix: [
      [0, 0, 0, 0, 0, 0],
      [0, 1, 1, 2, 2, 0],
      [0, 3, 3, 4, 4, 0],
      [0, 5, 5, 6, 6, 0],
      [0, 7, 7, 8, 8, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    leftedTime: 0,
    score: 0
  }
  render() {
    const { matrix, isSelected, tryLinkable } = this.props
    return (
      <div className='pictures'>
        {
          matrix.map((row, y) => <div key={y} className='row'>
            {
              row.map((item, x) => 
                <div 
                  key={x} 
                  className={cx(`item-${item} item`, {selected: isSelected(x, y)})}
                  onClick={() => {
                    tryLinkable(x, y)
                  }}
                >
                </div>
              )
            }
          </div>)
        }
      </div>
    )
  }
}

export default GamePictureDisplay