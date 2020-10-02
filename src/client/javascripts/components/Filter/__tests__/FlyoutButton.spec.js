import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import FlyoutButton from '../FlyoutButton'

describe('Components FlyoutButton', () => {
  it('should render', () => {
    const wrapper = shallow(<FlyoutButton
      options={[]}
      onItemSelected={jest.fn()}
      label="label"
    />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('should render disabled', () => {
    const wrapper = shallow(<FlyoutButton
      options={[]}
      onItemSelected={jest.fn()}
      label="label"
      disabled
    />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('should open the flyout', () => {
    const wrapper = shallow(<FlyoutButton
      options={[]}
      onItemSelected={jest.fn()}
      label="label"
    />)

    wrapper.find('.flyoutButton').simulate('click')
    expect(wrapper.state('flyoutOpen')).toBeTruthy()
  })

  it('should close the flyout', () => {
    const wrapper = shallow(<FlyoutButton
      options={[]}
      onItemSelected={jest.fn()}
      label="label"
    />)

    wrapper.find('.flyoutButton').simulate('click')
    expect(wrapper.state('flyoutOpen')).toBeTruthy()

    wrapper.instance().onItemSelected()
    expect(wrapper.state('flyoutOpen')).toBeFalsy()
  })

  it('should select an item', () => {
    const onItemSelected = jest.fn()
    const item = { name: 'hi', id: 1 }
    const wrapper = shallow(<FlyoutButton
      options={[item]}
      onItemSelected={onItemSelected}
      label="label"
    />)

    wrapper.find('.flyoutButton').simulate('click')
    expect(wrapper.state('flyoutOpen')).toBeTruthy()

    wrapper.instance().onItemSelected(item)
    expect(onItemSelected).toHaveBeenCalledWith(item)
  })
})
