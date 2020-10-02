import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import fetchMock from 'fetch-mock'
import * as actions from '../yourFansActions'

const mockStore = configureMockStore([thunk])

describe('YourFans actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('should call get home data', () => {
    fetchMock.mock('https://fake/getHomeData.json',
      { body: { data: [] } }
    )

    const store = mockStore({})

    return store.dispatch(actions.getHomeData())
      .then(() => {
        expect(store.getActions()).toMatchSnapshot()
      })
  })
})
