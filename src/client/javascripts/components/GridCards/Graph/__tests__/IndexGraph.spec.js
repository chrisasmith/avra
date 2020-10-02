import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import IndexGraph from '../IndexGraph'

describe('IndexGraph Component', () => {
  it('Should show', () => {
    const wrapper = shallow(<IndexGraph
      title="title"
      tooltip="tip"
      value={1.1}
      maxValue={2}
    />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('Should show less than 0', () => {
    const wrapper = shallow(<IndexGraph
      title="title"
      tooltip="tip"
      value={0.2}
      maxValue={2}
    />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('Should show with a large max', () => {
    const wrapper = shallow(<IndexGraph
      title="title"
      tooltip="tip"
      value={0.2}
      maxValue={6}
    />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
})
