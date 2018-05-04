const defaultState = {
  foo: ''
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case 'AUTHENTICATION':
      return {
        ...state,
        authState: action.payload
      }
    default:
      return state
  }
};