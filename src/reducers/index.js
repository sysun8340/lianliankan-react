const data = (state = {}, action) => {
  switch (action.type) {
    case 'DATA_CHANGE':
      return {...state, ...action.data}
    default:
      return state
  }
}
export default data