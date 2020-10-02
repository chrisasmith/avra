import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import DashboardIndexModule from '../DashboardIndexModule'

const values = [
  { title: 'Beer', value: 1.23, tooltip: 'Have bought in the last 4 weeks' },
  { title: 'Auto', value: 1.15, tooltip: 'Intend to buy new in the next 12 months' },
  { title: 'Computer', value: 1.11, tooltip: 'Intend to buy new in the next 12 months' },
  { title: 'Computer accessories', value: 1.18, tooltip: 'Intend to buy new in the next 12 months' },
]

const arrayValues = [
  {
    id: 'all',
    name: 'All',
    values: [
      { title: 'Labatt Blue', value: 5.28 },
      { title: 'Samuel Adams', value: 2.46 },
    ],
  },
  {
    id: 'imported',
    name: 'Imported',
    values: [
      { title: 'Labatt Blue', value: 5.28 },
      { title: 'Heineken', value: 1.61 },
      { title: 'Corona Light', value: 1.52 },
    ],
  },
]

describe('DashboardIndexModule Component', () => {
  it('Should show', () => {
    const wrapper = shallow(<DashboardIndexModule
      title="title"
      isFetching={false}
      data={{ values }}
    />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('Should show scarborough', () => {
    const wrapper = shallow(<DashboardIndexModule
      title="title"
      isFetching={false}
      data={{ values }}
      scarborough
    />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('Should show with array data', () => {
    const wrapper = shallow(<DashboardIndexModule
      title="title"
      isFetching={false}
      data={arrayValues}
    />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('Should change data on dropdown', () => {
    const wrapper = shallow(<DashboardIndexModule
      title="title"
      isFetching={false}
      data={arrayValues}
    />)

    wrapper.find('select').simulate('change', { target: { value: 'imported' } })
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('Should show with a max higher than 2', () => {
    const wrapper = shallow(<DashboardIndexModule
      title="title"
      isFetching={false}
      data={{ values: [...values, { title: 'title', value: 6.18, tooltip: 'tip' }] }}
    />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('Should show expand button', () => {
    const wrapper = shallow(<DashboardIndexModule
      title="title"
      isFetching={false}
      data={{ values: [...values, { title: 'title', value: 1.18, tooltip: 'tip' }] }}
    />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('Should expand', () => {
    const wrapper = shallow(<DashboardIndexModule
      title="title"
      isFetching={false}
      data={{ values: [...values, { title: 'title', value: 1.18, tooltip: 'tip' }] }}
    />)

    wrapper.find('.seeMoreLink').find('a').simulate('click')

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('Should shrink', () => {
    const wrapper = shallow(<DashboardIndexModule
      title="title"
      isFetching={false}
      data={{ values: [...values, { title: 'title', value: 1.18, tooltip: 'tip' }] }}
    />)

    wrapper.find('.seeMoreLink').find('a').simulate('click')
    wrapper.find('.seeMoreLink').find('a').simulate('click')

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
})
