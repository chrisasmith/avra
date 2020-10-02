import * as ActionTypes from './yourFansActions'

export default function reducer(state = {
  data: null,
}, action) {
  switch (action.type) {
    case ActionTypes.HOME_PAGE_DATA_SUCCESS: {
      return { ...state, data: action.data }
    }

    default:
      return state
  }
}
