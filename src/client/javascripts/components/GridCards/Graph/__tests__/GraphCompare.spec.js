import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import GraphCompare from '../GraphCompare'
import { MODULE_TYPE } from '../../DashboardGraphModule'

describe('GraphCompare Component', () => {
  it('Should show', () => {
    const wrapper = shallow(<GraphCompare
      title="title"
      values={['8', '2']}
      type={MODULE_TYPE.COUNT}
      maxValue={10}
    />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('Should show percent', () => {
    const wrapper = shallow(<GraphCompare
      title="title"
      values={['80', '20']}
      type={MODULE_TYPE.PERCENT}
    />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('Should show edge cases', () => {
    const wrapper = shallow(<GraphCompare
      title="title"
      values={['0', '100']}
      type={MODULE_TYPE.PERCENT}
    />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
})
