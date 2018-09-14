import React, { Component } from 'react'
import GamePictureDisplay from './GamePictureDisplay' 
import GameControl from './GameControl'
import GameMessage from './GameMessage'
import LinkLine from './LinkLine'
import '../styles/game.css'
import { Container, Header, Grid, Segment, Divider } from 'semantic-ui-react'
import { genMatrix, frameMatrix, isLinkable, resetMatrix } from '../utils'

class Game extends Component {

  state = {
    matrix: frameMatrix(genMatrix()),
    selected: [],
    current: [],
    linkablePoints: [],
    remainedTime: 0,
    score: 0,
    isGameStart: false,
    isGameOver: false
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
    const currentX = this.state.current[0]
    const currentY = this.state.current[1]
    if(selectedX === x && selectedY === y) return true
    if(currentX === x && currentY ===y) return true
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
    // 判断是否可连，如果可连重置matrix和selected、current、分数
    const linkablePoints = isLinkable(this.state.selected, [x, y], this.state.matrix)
    if(linkablePoints) {
      this.setState({
        linkablePoints: linkablePoints,
        current: [x, y]
      })
      setTimeout(() => {
        this.setState({
          matrix: resetMatrix(this.state.selected, [x, y], this.state.matrix),
          selected: [],
          current: [],
          linkablePoints: [],
          score: this.state.score + 1
        })
      }, 100)
    }
    // 如果不可连重置selected
    else {
      this.setSelectedCoordinate(x, y)
    }
  }

  handleStart = () => {
    this.setState({
      remainedTime: 100,
      isGameStart: true
    })
    this.timer = setInterval(this.countDown, 1000)
  }

  countDown = () => {
    if(this.state.remainedTime === 0) {
      clearInterval(this.timer)
      this.setState({
        isGameStart: false,
        isGameOver: true
      })
      return
    }
    this.setState({
      remainedTime: this.state.remainedTime - 1
    })
  }

  handleReset = () => {
    this.setState({
      matrix: frameMatrix(genMatrix()),
      selected: [],
      current: [],
      remainedTime: 0,
      score: 0,
      isGameStart: false,
      isGameOver: false
    })
  }

  render() {
    
    return (
      <div>
        <Container style={{marginTop: '1rem'}}>
          <Header as='h1'>连连看</Header>
          <Grid centered style={{
            border: '1px solid gray',
            minHeight: '550px', 
            width: '1000px'
          }}>
            <Grid.Column width={11} textAlign={'center'} verticalAlign={'middle'}>
              <GamePictureDisplay 
                {...this.state} 
                setSelectedCoordinate={this.setSelectedCoordinate} 
                isSelected={this.isSelected}
                tryLinkable={this.tryLinkable}
              />
              <LinkLine linkablePoints={this.state.linkablePoints}/>
            </Grid.Column>
            <Grid.Column width={5}  textAlign={'center'} verticalAlign={'middle'}>
              <Segment>
                <GameControl 
                  handleStart={this.handleStart} 
                  handleReset={this.handleReset}
                  isGameStart={this.state.isGameStart} 
                  isGameOver={this.state.isGameOver}
                />
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