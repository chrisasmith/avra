import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import FlyoutMenu from '../FlyoutMenu'

describe('Components FlyoutMenu', () => {
  it('should render', () => {
    const wrapper = shallow(<FlyoutMenu
      options={[]}
      onItemSelected={jest.fn()}
    />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('should render items', () => {
    const wrapper = shallow(<FlyoutMenu
      options={[{ name: 'hi', id: 0 }]}
      onItemSelected={jest.fn()}
    />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('should select an item', () => {
    const onItemSelected = jest.fn()
    const item = { name: 'hi', id: 0 }
    const wrapper = shallow(<FlyoutMenu
      options={[item]}
      onItemSelected={onItemSelected}
    />)

    wrapper.find('.item').simulate('click')
    expect(onItemSelected).toHaveBeenCalledWith(item)
  })

  it('should render group items', () => {
    const wrapper = shallow(<FlyoutMenu
      options={[{ name: 'hi', id: 0, isGroup: true }]}
      onItemSelected={jest.fn()}
    />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('should render items with children', () => {
    const wrapper = shallow(<FlyoutMenu
      options={[{ name: 'hi', id: 0, children: [{ name: 'second', id: 1 }] }]}
      onItemSelected={jest.fn()}
    />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('should switch pages', () => {
    const wrapper = shallow(<FlyoutMenu
      options={[{ name: 'hi', id: 0, children: [{ name: 'second', id: 1 }] }]}
      onItemSelected={jest.fn()}
    />)

    wrapper.find('.item').simulate('click')
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
})
