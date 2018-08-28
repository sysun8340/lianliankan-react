import React from 'react'
import { Label, Divider } from 'semantic-ui-react'

const GameMessage = () => {
  return (
    <div>
      <Label size={'huge'}>剩余时间：0 秒</Label>
      <Divider/>
      <Label size={'huge'}>分数：0</Label>
    </div>
  )
}

export default GameMessage