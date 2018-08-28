import React, { Component } from 'react'
import '../styles/gameControl.css'
import 'semantic-ui-css/semantic.min.css'
import { Button, Segment } from 'semantic-ui-react'

class GameControl extends Component {
  render() {
    return (
      <div className='control'>
        <Button positive >开始</Button>
      </div>
    )
  }
}

export default GameControl