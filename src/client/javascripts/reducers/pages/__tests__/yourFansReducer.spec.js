import reducer from '../yourFansReducer'
import * as ActionTypes from '../yourFansActions'

describe('Your Fans reducer', () => {
  it('should handle GET_HOME_PAGE.SUCCESS', () => {
    expect(
      reducer({}, {
        type: ActionTypes.GET_HOME_PAGE.SUCCESS,
        response: {
          data: [],
        },
      })
    ).toMatchSnapshot()
  })
})
