import React, { Component } from 'react'
import GamePictureDisplay from './GamePictureDisplay' 
import GameControl from './GameControl'
import GameMessage from './GameMessage'
import '../styles/game.css'

class Game extends Component {
  render() {
    return (
      <div className='game container' >
        <GamePictureDisplay />
        <div className='panel container'>
          <GameControl />
          <GameMessage />
        </div>
      </div>
    )
  }
}

export default Game