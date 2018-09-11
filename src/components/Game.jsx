import React, { Component } from 'react'
import GamePictureDisplay from './GamePictureDisplay' 
import GameControl from './GameControl'
import GameMessage from './GameMessage'
import '../styles/game.css'
import { Container, Header, Grid, Segment, Divider } from 'semantic-ui-react'
import { genMatrix, frameMatrix, isLinkable, resetMatrix } from '../utils'

class Game extends Component {

  state = {
    matrix: frameMatrix(genMatrix()),
    selected: [],
    current: [],
    remainedTime: 0,
    score: 0
  }

  setSelectedCoordinate = (x, y) => {
    this.setState({
      selected: [x, y]
    })
  }

  // 判断这个格子是否是当前选中的格子，用于className拼字符串
  isSelected = (x, y) => {
    const selectedX = this.state.selected[0]
    const selectedY = this.state.selected[1]
    if(selectedX === x && selectedY === y) return true
    return false
  }

  tryLinkable = (x, y) => {
    // 判断selected是否是undefined,如果是就初始化selected
    if(this.state.selected[0] === undefined) {
      this.setState({
        selected: [x, y]
      })
    }
    // 如果在空格子上点击，直接返回
    if(this.state.matrix[y][x] === 0) return
    // 判断是否可连，如果可连重置matrix和selected
    else if(isLinkable(this.state.selected, [x, y], this.state.matrix)) {
      this.setState({
        matrix: resetMatrix(this.state.selected, [x, y], this.state.matrix),
        selected: []
      })
    }
    // 如果不可连重置selected
    else {
      this.setSelectedCoordinate(x, y)
    }
  }

  handleStart = () => {
    this.setState({
      remainedTime: 120
    })
    
  }

  countDown = () => {
    this.timer = setInterval(this.setState({
      remainedTime: this.state.remainedTime - 1
    }), 1000)
  }

  render() {
    
    return (
      <div>
        <Container style={{marginTop: '1rem'}}>
          <Header as='h1'>连连看</Header>
          <Grid centered style={{
            border: '1px solid gray',
            minHeight: '550px', 
            minWidth: '1000px'
          }}>
            <Grid.Column width={11} textAlign={'center'} verticalAlign={'middle'}>
              <GamePictureDisplay 
                {...this.state} 
                setSelectedCoordinate={this.setSelectedCoordinate} 
                isSelected={this.isSelected}
                tryLinkable={this.tryLinkable}
              />
            </Grid.Column>
            <Grid.Column width={5}  textAlign={'center'} verticalAlign={'middle'}>
              <Segment>
                <GameControl handleStart={this.handleStart}/>
                <Divider />
                <GameMessage 
                  {...this.state} 
                />
              </Segment>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    )
  }
}

export default Game