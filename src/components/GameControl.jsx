import React, { Component } from 'react'
import '../styles/gameControl.css'
import 'semantic-ui-css/semantic.min.css'
import { Button, Header } from 'semantic-ui-react'

class GameControl extends Component {
  render() {
    const { handleStart, handleReset, isGameStart, isGameOver } = this.props
    return (
      <div className='control'>
        {
          isGameStart ? <Header as='h2'>游戏进行中...</Header> : 
            (isGameOver ? <Button color={'blue'} onClick={() => handleReset()}>游戏结束，再来一局</Button> : 
            <Button positive onClick={() => handleStart()}>开始</Button>)
        }
      </div>
    )
  }
}

export default GameControl