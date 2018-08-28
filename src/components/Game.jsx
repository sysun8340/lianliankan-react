import React, { Component } from 'react'
import GamePictureDisplay from './GamePictureDisplay' 
import GameControl from './GameControl'
import GameMessage from './GameMessage'
import '../styles/game.css'
import { Container, Header, Grid, Segment, Divider } from 'semantic-ui-react'

class Game extends Component {

  render() {
    return (
      <div>
        <Container style={{marginTop: '1rem'}}>
          <Header as='h1'>连连看</Header>
          <Grid centered style={{border: '1px solid gray', height: '550px'}}>
            <Grid.Column width={12} textAlign={'center'} verticalAlign={'middle'}>
              <GamePictureDisplay />
            </Grid.Column>
            <Grid.Column width={4}  textAlign={'center'} verticalAlign={'middle'}>
              <Segment>
                <GameControl />
                <Divider />
                <GameMessage />
              </Segment>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    )
  }
}

export default Game