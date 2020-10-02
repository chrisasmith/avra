import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { shallowToJson } from 'enzyme-to-json'
import MediaProfile from '../MediaProfile'

const mockStore = configureMockStore([thunk])

let store

const getTab = s => shallow(<MediaProfile store={mockStore(s)} />).shallow()

describe('Media Profile Tab', () => {
  beforeEach(() => {
    store = {
      location: { },
      loading: {

      },
      error: {

      },
      filters: {
        filter: {
          property: {
            name: 'property',
          },
          benchmark: {
            name: 'benchmark',
          },
        },
      },
      pages: {
        yourFans: {
          data: null,
        },
      },
    }
  })

  it('should show', () => {
    const wrapper = getTab(store)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('should show loading', () => {
    store.loading.GET_HOME_PAGE = true

    const wrapper = getTab(store)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
})
