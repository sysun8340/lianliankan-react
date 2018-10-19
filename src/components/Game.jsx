import React, { Component } from 'react'
import GamePictureDisplay from './GamePictureDisplay' 
import GameControl from './GameControl'
import GameMessage from './GameMessage'
import LinkLine from './LinkLine'
import '../styles/game.css'
import { Container, Header, Grid, Segment, Divider } from 'semantic-ui-react'
import { frameMatrix, genMatrix, isLinkable, resetMatrix } from '../utils'
import { connect } from 'react-redux'

class Game extends Component {

  // state = {
  //   matrix: frameMatrix(genMatrix()),
  //   selected: [],
  //   current: [],
  //   linkablePoints: [],
  //   remainedTime: 0,
  //   score: 0,
  //   isGameStart: false,
  //   isGameOver: false
  // }
  setSelectedCoordinate = (x, y) => {
    this.props.dispatch({
      type: 'DATA_CHANGE',
      data: {
        selected: [x, y]
      }
    })
  }

  // 判断这个格子是否是当前选中的格子，用于className拼字符串
  isSelected = (x, y) => {
    const selectedX = this.props.selected[0]
    const selectedY = this.props.selected[1]
    const currentX = this.props.current[0]
    const currentY = this.props.current[1]
    if(selectedX === x && selectedY === y) return true
    if(currentX === x && currentY ===y) return true
    return false
  }

  tryLinkable = (x, y) => {
    // 判断selected是否是undefined,如果是就初始化selected
    if(this.props.selected[0] === undefined) {
      this.props.dispatch({
        type: 'DATA_CHANGE',
        data: {
          selected: [x, y]
        }
      })
    }
    // 如果在空格子上点击，直接返回
    if(this.props.matrix[y][x] === 0) return
    // 判断是否可连，如果可连重置matrix和selected、current、分数
    const linkablePoints = isLinkable(this.props.selected, [x, y], this.props.matrix)
    if(linkablePoints) {
      this.props.dispatch({
        type: 'DATA_CHANGE',
        data: {
          linkablePoints: linkablePoints,
          current: [x, y]
        }
      })
      setTimeout(() => {
        this.props.dispatch({
          type: 'DATA_CHANGE',
          data: {
            matrix: resetMatrix(this.props.selected, [x, y], this.props.matrix),
            selected: [],
            current: [],
            linkablePoints: [],
            score: this.props.score + 1
          }
        })
      }, 100)
    }
    // 如果不可连重置selected
    else {
      this.setSelectedCoordinate(x, y)
    }
  }

  handleStart = () => {
    this.props.dispatch({
      type: 'DATA_CHANGE',
      data: {
        remainedTime: 30,
        isGameStart: true
      }
    })
    this.timer = setInterval(this.countDown, 1000)
  }

  countDown = () => {
    if(this.props.remainedTime === 0) {
      clearInterval(this.timer)
      this.props.dispatch({
        type: 'DATA_CHANGE',
        data: {
          isGameStart: false,
          isGameOver: true
        }
      })
      return
    }
    this.props.dispatch({
      type: 'DATA_CHANGE',
      data: {
        remainedTime: this.props.remainedTime - 1
      }
    })
  }

  handleReset = () => {
    this.props.dispatch({
      type: 'DATA_CHANGE',
      data: {
        matrix: frameMatrix(genMatrix()),
        selected: [],
        current: [],
        remainedTime: 0,
        score: 0,
        isGameStart: false,
        isGameOver: false
      }
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
                {...this.props} 
                setSelectedCoordinate={this.setSelectedCoordinate} 
                isSelected={this.isSelected}
                tryLinkable={this.tryLinkable}
              />
              <LinkLine linkablePoints={this.props.linkablePoints}/>
            </Grid.Column>
            <Grid.Column width={5}  textAlign={'center'} verticalAlign={'middle'}>
              <Segment>
                <GameControl 
                  handleStart={this.handleStart} 
                  handleReset={this.handleReset}
                  isGameStart={this.props.isGameStart} 
                  isGameOver={this.props.isGameOver}
                />
                <Divider />
                <GameMessage 
                  {...this.props} 
                />
              </Segment>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = data => ({
  matrix: data.matrix,
  selected: data.selected,
  current: data.current,
  linkablePoints: data.linkablePoints,
  remainedTime: data.remainedTime,
  score: data.score,
  isGameStart: data.isGameStart,
  isGameOver: data.isGameOver
})

export default connect(mapStateToProps)(Game)