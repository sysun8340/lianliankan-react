import React, { Component } from 'react'
import GameControl from './GameControl'
import GameMessage from './GameMessage'
import PictureSelector from './PictureSelector'
import ProgressBar from './ProgressBar'

class GameBoard extends Component {
  render() {
    return (
      <div className='gameBoard container' >
        <ProgressBar />
        <PictureSelector />
        <GameControl />
        <GameMessage />
      </div>
    )
  }
}

export default GameBoard