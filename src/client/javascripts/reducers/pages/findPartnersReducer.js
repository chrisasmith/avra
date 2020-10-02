import * as ActionTypes from './findPartnersActions'

export default function reducer(state = {
  data: null,
}, action) {
  switch (action.type) {
    case ActionTypes.FIND_PARTNERS_PAGE_DATA_SUCCESS: {
      return { ...state, data: action.data }
    }

    default:
      return state
  }
}
