const defaultState = {
  authenticated: undefined
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case 'AUTHENTICATION':
      return {
        ...state,
        authenticated: action.payload
      }
    default:
      return state
  }
};