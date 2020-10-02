import reducer from '../filterReducer'
import * as ActionTypes from '../filterActions'

describe('Filter reducer', () => {
  it('should handle UPDATE_FILTER', () => {
    expect(
      reducer({}, {
        type: ActionTypes.UPDATE_FILTER,
        filter: {
          type: true,
        },
      })
    ).toMatchSnapshot()
  })
})
