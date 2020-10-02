import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import Nav from '../Nav'

describe('App components nav', () => {
  it('should render', () => {
    const wrapper = shallow(<Nav location={{ pathname: '/' }} />)
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
})
