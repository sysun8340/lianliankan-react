import React from 'react'
import { Label, Divider } from 'semantic-ui-react'

const GameMessage = ({remainedTime, score}) => {
  return (
    <div>
      <Label size={'huge'}>剩余时间：{ remainedTime } 秒</Label>
      <Divider/>
      <Label size={'huge'}>分数：{ score }</Label>
    </div>
  )
}

export default GameMessage