import reducer from '../findPartnersReducer'
import * as ActionTypes from '../findPartnersActions'

describe('Find Partners reducer', () => {
  it('should handle GET_FIND_PARTNERS_PAGE.SUCCESS', () => {
    expect(
      reducer({}, {
        type: ActionTypes.GET_FIND_PARTNERS_PAGE.SUCCESS,
        response: {
          data: [],
        },
      })
    ).toMatchSnapshot()
  })
})
