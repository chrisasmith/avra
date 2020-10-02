import React from 'react'
import { mount } from 'enzyme'
import { renderToJson } from 'enzyme-to-json'
import FilterBreadCrumb from '../FilterBreadCrumb'
import { DEFAULT_FILTER } from '../../../reducers/filters/filterActions'

describe('Components FilterBreadCrumb', () => {
  it('should render', () => {
    const wrapper = mount(<FilterBreadCrumb
      filter={DEFAULT_FILTER}
    />)

    expect(renderToJson(wrapper.render())).toMatchSnapshot()
  })

  it('should render country', () => {
    const wrapper = mount(<FilterBreadCrumb
      filter={{ ...DEFAULT_FILTER, country: { id: 5 } }}
    />)

    expect(renderToJson(wrapper.render())).toMatchSnapshot()
  })

  it('should render age', () => {
    const wrapper = mount(<FilterBreadCrumb
      filter={{ ...DEFAULT_FILTER, ages: { men: [1], women: [0] } }}
    />)

    expect(renderToJson(wrapper.render())).toMatchSnapshot()
  })

  it('should render income', () => {
    const wrapper = mount(<FilterBreadCrumb
      filter={{ ...DEFAULT_FILTER, income: [0] }}
    />)

    expect(renderToJson(wrapper.render())).toMatchSnapshot()
  })

  it('should render kids', () => {
    const wrapper = mount(<FilterBreadCrumb
      filter={{ ...DEFAULT_FILTER, kids: [0] }}
    />)

    expect(renderToJson(wrapper.render())).toMatchSnapshot()
  })

  it('should render interest', () => {
    const wrapper = mount(<FilterBreadCrumb
      filter={{ ...DEFAULT_FILTER, interest: [0] }}
    />)

    expect(renderToJson(wrapper.render())).toMatchSnapshot()
  })

  it('should render all of them', () => {
    const wrapper = mount(<FilterBreadCrumb
      filter={{ ...DEFAULT_FILTER, country: { id: 5 }, ages: { men: [1], women: [0] }, income: [0], kids: [0], interest: [0] }}
    />)

    expect(renderToJson(wrapper.render())).toMatchSnapshot()
  })
})
