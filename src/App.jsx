import React, { Component } from 'react'
import Game from './components/Game'
import './styles/game.css'

class App extends Component {

  render() {
    return (
      <div>
        <h1>连连看</h1>
        <Game />
      </div>
    )
  }
}

export default App
