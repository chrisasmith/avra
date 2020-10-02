import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import IndustryBreadcrumb from '../IndustryBreadcrumb'

describe('Industry Breadcrumb Component', () => {
  it('Should show', () => {
    const wrapper = shallow(<IndustryBreadcrumb
      industry={{ id: 'stuff', name: 'name' }}
    />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('Should show with types', () => {
    const wrapper = shallow(<IndustryBreadcrumb
      industry={{ id: 'stuff', name: 'name', subsections: [{ id: '1', name: 'first' }, { id: '2', name: 'second' }, { id: '3', name: 'a' }] }}
      params={{ subsection_id: null }}
    />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('Should show active type', () => {
    const wrapper = shallow(<IndustryBreadcrumb
      industry={{ id: 'stuff', name: 'name', subsections: [{ id: '1', name: 'first' }, { id: '2', name: 'second' }, { id: '3', name: 'a' }] }}
      params={{ subsection_id: '2' }}
    />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
})
