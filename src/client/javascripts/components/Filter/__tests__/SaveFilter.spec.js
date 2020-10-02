import React from 'react'
import { shallow, mount } from 'enzyme'
import { shallowToJson, renderToJson } from 'enzyme-to-json'
import SaveFilter from '../SaveFilter'

jest.mock('../../TooltipPopup')

describe('Components SaveFilter', () => {
  it('should render', () => {
    const wrapper = shallow(<SaveFilter
      onSave={jest.fn()}
    />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('should pop open', () => {
    const wrapper = mount(<SaveFilter
      onSave={jest.fn()}
    />)

    wrapper.find('a').simulate('click')
    expect(renderToJson(wrapper.render())).toMatchSnapshot()
  })

  it('should enable save', () => {
    const wrapper = mount(<SaveFilter
      onSave={jest.fn()}
    />)

    wrapper.find('a').simulate('click')
    wrapper.find('input').simulate('change', { target: { value: 'hi' } })
    expect(renderToJson(wrapper.render())).toMatchSnapshot()
  })

  it('should fire save', () => {
    const onSave = jest.fn()
    const wrapper = mount(<SaveFilter
      onSave={onSave}
    />)

    wrapper.find('a').simulate('click')
    wrapper.find('input').simulate('change', { target: { value: 'hi' } })
    wrapper.find('.btn-primary').simulate('click')
    expect(renderToJson(wrapper.render())).toMatchSnapshot()
    expect(onSave).toHaveBeenCalledWith('hi')
  })
})
