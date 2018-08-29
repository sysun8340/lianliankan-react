import React, { Component } from 'react'
import GamePictureDisplay from './GamePictureDisplay' 
import GameControl from './GameControl'
import GameMessage from './GameMessage'
import '../styles/game.css'
import { Container, Header, Grid, Segment, Divider } from 'semantic-ui-react'
import { genMatrix, frameMatrix } from '../utils'

class Game extends Component {

  state = {
    matrix: frameMatrix(genMatrix()),
    selected: [],
    current: [],
    remainedTime: 0,
    score: 0
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
              <GamePictureDisplay {...this.state} />
            </Grid.Column>
            <Grid.Column width={5}  textAlign={'center'} verticalAlign={'middle'}>
              <Segment>
                <GameControl />
                <Divider />
                <GameMessage {...this.state}/>
              </Segment>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    )
  }
}

export default Game