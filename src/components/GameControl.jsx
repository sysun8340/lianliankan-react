import React, { Component } from 'react'
import '../styles/gameControl.css'
import 'semantic-ui-css/semantic.min.css'
import { Button } from 'semantic-ui-react'

class GameControl extends Component {
  render() {
    const { handleStart } = this.props
    return (
      <div className='control'>
        <Button positive onClick={() => handleStart()}>开始</Button>
      </div>
    )
  }
}

export default GameControl