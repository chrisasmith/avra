import React from 'react'
import { shallow, mount } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import FilterButton from '../FilterButton'

describe('Components FilterButton', () => {
  it('should render', () => {
    const wrapper = shallow(<FilterButton
      value={1}
      values={[1, 2]}
      onChange={jest.fn()}
      name="thingy"
    />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('fire change', () => {
    const onChange = jest.fn()
    const wrapper = mount(<FilterButton
      value={1}
      values={[1, 2]}
      onChange={onChange}
      name="thingy"
    />)

    wrapper.find('Button').simulate('click')
    expect(onChange).toHaveBeenCalledWith('thingy', 1)
  })

  it('should render inactive', () => {
    const wrapper = shallow(<FilterButton
      value={1}
      values={[2]}
      onChange={jest.fn()}
      name="thingy"
    />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('should render children', () => {
    const wrapper = shallow(<FilterButton
      value={1}
      values={[2]}
      onChange={jest.fn()}
      name="thingy"
    ><div>hi</div></FilterButton>)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
})
