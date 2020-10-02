import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import Tabs from '../Tabs'
import { routes } from '../../../../routes'

describe('Tabs Component', () => {
  it('Should show', () => {
    const wrapper = shallow(<Tabs
      location={{ pathname: '' }}
    />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('Should show active tab', () => {
    const wrapper = shallow(<Tabs
      location={{ pathname: routes.YOURFANS.INTEREST_PROFILE }}
    />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
})
