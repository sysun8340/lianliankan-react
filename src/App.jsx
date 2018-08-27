import React, { Component } from 'react'
import GameBoard from './components/GameBoard'
import gameBoard from './styles/gameBoard.css'

class App extends Component {

  render() {
  
    return (
      <div>
        <GameBoard style={gameBoard} />
      </div>
    )
  }
}

export default App
