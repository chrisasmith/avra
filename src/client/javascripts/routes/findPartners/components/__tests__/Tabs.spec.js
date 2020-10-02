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
      location={{ pathname: routes.FINDPARTNERS.INDUSTRIES }}
    />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('Should show dropdown', () => {
    const wrapper = shallow(<Tabs
      location={{ pathname: '' }}
      industries={[{ id: 1, name: 'first' }, { id: 1, name: 'second' }]}
    />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
})
