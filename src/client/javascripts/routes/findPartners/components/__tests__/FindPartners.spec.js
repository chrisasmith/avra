import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { shallowToJson } from 'enzyme-to-json'
import FindPartners from '../FindPartners'

const mockStore = configureMockStore([thunk])

let store

const getFindPartnersPage = s => shallow(<FindPartners store={mockStore(s)} />).shallow()

describe('Find Partners Page', () => {
  beforeEach(() => {
    store = {
      location: { },
      params: { industry_id: null, subsection_id: null },
      loading: {

      },
      error: {

      },
      filters: {
        filter: {},
      },
      pages: {
        findPartners: {
          data: null,
        },
      },
    }
  })

  it('should show loading', () => {
    store.loading.GET_FIND_PARTNERS_PAGE = true

    const wrapper = getFindPartnersPage(store)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('should fire refresh on location industry id change', () => {
    const getData = jest.fn()
    const mock = mockStore(store)
    const wrapper = shallow(<FindPartners store={mock} getFindPartnersData={getData} />).shallow()

    mock.clearActions()
    wrapper.instance().componentWillReceiveProps({ params: { industry_id: 1, subsection_id: null } })
    expect(mock.getActions()).toEqual([{ request: {}, type: 'GET_FIND_PARTNERS_PAGE_REQUEST' }])
  })

  it('should fire refresh on location industry child id change', () => {
    store.params.industry_id = 1
    const getData = jest.fn()
    const mock = mockStore(store)
    const wrapper = shallow(<FindPartners store={mock} getFindPartnersData={getData} />).shallow()

    mock.clearActions()
    wrapper.instance().componentWillReceiveProps({ params: { industry_id: 1, subsection_id: 2 } })
    expect(mock.getActions()).toEqual([{ request: {}, type: 'GET_FIND_PARTNERS_PAGE_REQUEST' }])
  })

  it('should show error', () => {
    store.error.GET_FIND_PARTNERS_PAGE = 'bad stuff happened'

    const wrapper = getFindPartnersPage(store)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
})
