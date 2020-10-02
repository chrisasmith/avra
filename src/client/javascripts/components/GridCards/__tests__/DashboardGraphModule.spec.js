import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import DashboardGraphModule, { MODULE_TYPE } from '../DashboardGraphModule'

const values = [
  { title: 'India', values: [35100000, 33900000] },
  { title: 'USA', values: [29600000, 25400000] },
  { title: 'Russia', values: [80000000, 25400000] },
]

const percentValues = [
  { title: 'India', values: [80, 70] },
  { title: 'USA', values: [20, 30] },
  { title: 'Russia', values: [10, 100] },
]

describe('DashboardGraphModule Component', () => {
  it('Should show', () => {
    const wrapper = shallow(<DashboardGraphModule
      title="title"
      isFetching={false}
      type={MODULE_TYPE.COUNT}
      data={{ values }}
    />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('Should show expand button', () => {
    const wrapper = shallow(<DashboardGraphModule
      title="title"
      isFetching={false}
      type={MODULE_TYPE.COUNT}
      data={{ values: [...values, { title: 'another', values: [80000000, 25400000] }, { title: 'fifth', values: [80000000, 25400000] }] }}
    />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('Should expand', () => {
    const wrapper = shallow(<DashboardGraphModule
      title="title"
      isFetching={false}
      type={MODULE_TYPE.COUNT}
      data={{ values: [...values, { title: 'another', values: [80000000, 25400000] }, { title: 'fifth', values: [80000000, 25400000] }] }}
    />)

    wrapper.find('.seeMoreLink').find('a').simulate('click')

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('Should shrink', () => {
    const wrapper = shallow(<DashboardGraphModule
      title="title"
      isFetching={false}
      type={MODULE_TYPE.COUNT}
      data={{ values: [...values, { title: 'another', values: [80000000, 25400000] }, { title: 'fifth', values: [80000000, 25400000] }] }}
    />)

    wrapper.find('.seeMoreLink').find('a').simulate('click')
    wrapper.find('.seeMoreLink').find('a').simulate('click')

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('Should show percent', () => {
    const wrapper = shallow(<DashboardGraphModule
      title="title"
      isFetching={false}
      type={MODULE_TYPE.PERCENT}
      data={{ values: percentValues }}
    />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('Should show titles', () => {
    const wrapper = shallow(<DashboardGraphModule
      title="title"
      description="description"
      keyDescription="description {}"
      propertyTitle="value title"
      benchmarkTitle="Benchmark Title"
      sideTitle="side title"
      isFetching={false}
      type={MODULE_TYPE.PERCENT}
      data={{ values: percentValues }}
    />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('Should show total', () => {
    const wrapper = shallow(<DashboardGraphModule
      showTotal
      title="title"
      description="description"
      keyDescription="key description in {}"
      propertyTitle="value title"
      benchmarkTitle="Benchmark Title"
      sideTitle="side title"
      isFetching={false}
      type={MODULE_TYPE.COUNT}
      total={1000000000}
      data={{ values }}
    />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('Should show loading', () => {
    const wrapper = shallow(<DashboardGraphModule
      showTotal
      isFetching
      title="title"
      description="description"
      keyDescription="key description in {}"
      propertyTitle="value title"
      benchmarkTitle="Benchmark Title"
      sideTitle="side title"
      type={MODULE_TYPE.COUNT}
      total={1000000000}
      data={{ values }}
    />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
})
