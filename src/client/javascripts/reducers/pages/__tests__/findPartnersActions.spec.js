import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import fetchMock from 'fetch-mock'
import * as actions from '../findPartnersActions'

const mockStore = configureMockStore([thunk])

describe('FindPartners actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('should call get find partners data', () => {
    fetchMock.mock('https://fake/findPartners.json',
      { body: { data: [] } }
    )

    const store = mockStore({})

    return store.dispatch(actions.getFindPartnersData())
      .then(() => {
        expect(store.getActions()).toMatchSnapshot()
      })
  })
})
