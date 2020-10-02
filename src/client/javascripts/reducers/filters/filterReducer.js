import * as ActionTypes from './filterActions'

export default function reducer(state = {
  filter: { ...ActionTypes.DEFAULT_FILTER, ages: { ...ActionTypes.DEFAULT_FILTER.ages } },
  options: { ...ActionTypes.DEFAULT_OPTIONS },
}, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_FILTER: {
      return { ...state, filter: action.filter }
    }

    default:
      return state
  }
}
