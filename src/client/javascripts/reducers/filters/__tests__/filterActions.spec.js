import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import fetchMock from 'fetch-mock'
import * as actions from '../filterActions'

const mockStore = configureMockStore([thunk])

describe('FilterActions actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('should call save filter', () => {
    fetchMock.mock('https://fake/saveFilter.json',
      { body: { data: [] } }
    )

    const store = mockStore({})

    return store.dispatch(actions.saveFilter({}))
      .then(() => {
        expect(store.getActions()).toMatchSnapshot()
      })
  })

  it('Should update the filter', () => {
    const action = actions.updateFilter({ filter: { item: true } })
    expect(action).toMatchSnapshot()
  })
})
