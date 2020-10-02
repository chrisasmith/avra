import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { shallowToJson } from 'enzyme-to-json'
import Industries from '../Industries'

const mockStore = configureMockStore([thunk])

let store

const getTab = s => shallow(<Industries store={mockStore(s)} />).shallow()

describe('Industries Tab', () => {
  beforeEach(() => {
    store = {
      location: { },
      params: { },
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
        findPartners: {
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
    store.loading.GET_FIND_PARTNERS_PAGE = true

    const wrapper = getTab(store)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
})
