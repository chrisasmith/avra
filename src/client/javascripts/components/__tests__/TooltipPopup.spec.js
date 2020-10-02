import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import TooltipPopup from '../TooltipPopup'

describe('TooltipPopup Component', () => {
  it('Should show', () => {
    const wrapper = shallow(<TooltipPopup
      target={{}}
      onClickOutside={jest.fn()}
    >
      <div>hi</div>
    </TooltipPopup>)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('Should show', () => {
    const wrapper = shallow(<TooltipPopup
      target={{}}
      onClickOutside={jest.fn()}
      show
    >
      <div>hi</div>
    </TooltipPopup>)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
})
