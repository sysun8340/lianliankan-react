import { createStore } from 'redux'
import appData from './reducers'
import { genMatrix, frameMatrix } from './utils'

const initialData = {
  matrix: frameMatrix(genMatrix()),
  selected: [],
  current: [],
  linkablePoints: [],
  remainedTime: 0,
  score: 0,
  isGameStart: false,
  isGameOver: false
}
const configureStore = createStore(appData, initialData)

export default configureStore
