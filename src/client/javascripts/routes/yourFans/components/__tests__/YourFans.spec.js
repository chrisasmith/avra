import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { shallowToJson } from 'enzyme-to-json'
import YourFans from '../YourFans'

const mockStore = configureMockStore([thunk])

let store

const getHome = s => shallow(<YourFans store={mockStore(s)} />).shallow()

describe('Home Page', () => {
  beforeEach(() => {
    store = {
      location: { },
      loading: {

      },
      error: {

      },
      filters: {
        filter: {},
      },
      pages: {
        yourFans: {
          data: null,
        },
      },
    }
  })

  it('should show loading', () => {
    store.loading.GET_HOME_PAGE = true

    const wrapper = getHome(store)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('should show error', () => {
    store.error.GET_HOME_PAGE = 'bad stuff happened'

    const wrapper = getHome(store)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
})
