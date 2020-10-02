import React from 'react'
import { shallow, mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { shallowToJson } from 'enzyme-to-json'
import ConnectedFilterBar, { FilterBar } from '../FilterBar'
import { DEFAULT_FILTER, DEFAULT_OPTIONS } from '../../../reducers/filters/filterActions'

const mockStore = configureMockStore([thunk])
let store

const getFilterBar = (s, onChange = jest.fn()) => mount(<ConnectedFilterBar store={mockStore(s)} onFilterChange={onChange} />)
let getUnconnectedFilterBar = function empty() {}

describe('Components FilterBar', () => {
  beforeEach(() => {
    store = {
      location: { },
      loading: {

      },
      error: {

      },
      filters: {
        options: JSON.parse(JSON.stringify(DEFAULT_OPTIONS)),
        filter: JSON.parse(JSON.stringify(DEFAULT_FILTER)),
      },
    }

    getUnconnectedFilterBar = (s, onChange = jest.fn()) => shallow(
      <FilterBar
        options={s.filters.options}
        filter={s.filters.filter}
        onFilterChange={onChange}
        saveFilter={jest.fn()}
        updateFilter={jest.fn()}
      />
    )
  })

  it('should render', () => {
    const wrapper = getUnconnectedFilterBar(store)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('should disabled filter button when there are no filters', () => {
    store.filters.options = { ...DEFAULT_OPTIONS, filter: [] }
    const wrapper = getUnconnectedFilterBar(store)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('should fire filter change', () => {
    const onChange = jest.fn()
    const wrapper = getFilterBar(store, onChange)

    const updated = { ...DEFAULT_FILTER, ages: { ...DEFAULT_FILTER.ages, men: [1, 2] } }

    wrapper.find('Button').at(0).simulate('click')
    expect(onChange).toHaveBeenCalledWith(updated)
  })

  it('should reset country and benchmark on property change', () => {
    const onChange = jest.fn()
    store.filters.filter = {
      ...DEFAULT_FILTER,
      country: { name: 'Slovnia', id: 3 },
      benchmark: { name: 'All foosball', id: 5 },
    }
    const wrapper = getFilterBar(store, onChange)
    const property = { name: 'new property', id: 1, type: 'league' }
    const updated = {
      ...store.filters.filter,
      country: DEFAULT_OPTIONS.country[0],
      benchmark: DEFAULT_OPTIONS.benchmark[0],
      property,
    }

    wrapper.instance().getWrappedInstance().onPropertySelected(property)
    expect(onChange).toHaveBeenCalledWith(updated)
  })

  it('should only list all sports when selecting a sport', () => {
    const wrapper = getUnconnectedFilterBar(store)

    const property = { name: 'new property', id: 1, type: 'sport' }
    wrapper.instance().onPropertySelected(property)
    expect(wrapper.state('benchmarks')).toEqual(DEFAULT_OPTIONS.benchmark)
  })

  it('should list the sport and all sports when selecting a team', () => {
    const wrapper = getUnconnectedFilterBar(store)

    const property = { name: 'new property', id: 1, type: 'team', sport: 'Foosball' }
    wrapper.instance().onPropertySelected(property)
    expect(wrapper.state('benchmarks')).toEqual([...DEFAULT_OPTIONS.benchmark, { id: 1, name: 'All Foosball Fans' }])
  })

  it('should update state on men gender filter change', () => {
    const wrapper = mount(
      <FilterBar
        options={store.filters.options}
        filter={store.filters.filter}
        onFilterChange={jest.fn()}
        saveFilter={jest.fn()}
        updateFilter={jest.fn()}
      />
    )

    wrapper.find('[name="men_age"]').find('Button').at(0).simulate('click')
    expect(shallowToJson(wrapper.find('[name="men_age"]'))).toMatchSnapshot()
  })

  it('should update state on women gender filter change', () => {
    const wrapper = mount(
      <FilterBar
        options={store.filters.options}
        filter={store.filters.filter}
        onFilterChange={jest.fn()}
        saveFilter={jest.fn()}
        updateFilter={jest.fn()}
      />
    )

    wrapper.find('[name="women_age"]').find('Button').at(0).simulate('click')
    expect(shallowToJson(wrapper.find('[name="women_age"]'))).toMatchSnapshot()
  })

  it('should update state on income filter change', () => {
    const wrapper = mount(
      <FilterBar
        options={store.filters.options}
        filter={store.filters.filter}
        onFilterChange={jest.fn()}
        saveFilter={jest.fn()}
        updateFilter={jest.fn()}
      />
    )

    wrapper.find('[name="income"]').find('Button').at(0).simulate('click')
    expect(shallowToJson(wrapper.find('[name="income"]'))).toMatchSnapshot()
  })

  it('should update state on kids filter change', () => {
    const wrapper = mount(
      <FilterBar
        options={store.filters.options}
        filter={store.filters.filter}
        onFilterChange={jest.fn()}
        saveFilter={jest.fn()}
        updateFilter={jest.fn()}
      />
    )

    wrapper.find('[name="kids"]').find('Button').at(0).simulate('click')
    expect(shallowToJson(wrapper.find('[name="kids"]'))).toMatchSnapshot()
  })
})
