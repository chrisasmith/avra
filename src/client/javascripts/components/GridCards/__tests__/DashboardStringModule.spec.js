import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import DashboardStringModule from '../DashboardStringModule'

describe('DashboardStringModule Component', () => {
  it('Should show', () => {
    const wrapper = shallow(<DashboardStringModule
      title="title"
      isFetching={false}
      value="hi"
    />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('Should show loading', () => {
    const wrapper = shallow(<DashboardStringModule
      title="title"
      isFetching
      value="hi"
    />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
})
