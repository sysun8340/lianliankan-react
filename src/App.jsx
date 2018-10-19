import React, { Component } from 'react'
import Game from './components/Game'
import './styles/game.css'
import { Provider } from 'react-redux'
import configureStore from './configureStore'

class App extends Component {

  render() {
    return (
      <div> 
        <Provider store={configureStore}>
          <Game />
        </Provider>
      </div>
    )
  }
}

export default App
