export const setMatrix = matrix => ({
  type: 'MATRIX_CHANGE',
  matrix: matrix
})

export const setMatrixSelected = point => ({
  type: 'MATRIX_SELECTED_CHANGE',
  selected: point
})

export const setMatrixCurrent = point => ({
  type: 'MATRIX_CURRENT_CHANGE',
  current: point
})

export const setLinkablePoints = points => ({
  type: 'LINKABLE_POINTS_CHANGE',
  linkablePoints: points
})

export const setRemainedTime = time => ({
  type: 'REMAINED_TIME_CHANGE',
  remainedTime: time
})

export const setScore = score => ({
  type: 'SCORE_CHANGE',
  score: score
})

export const setGameStatus = status => ({
  type: 'GAME_STATUS_CHANGE',
  status: status
})