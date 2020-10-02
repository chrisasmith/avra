import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import DashboardShellModule from '../DashboardShellModule'

describe('DashboardShellModule Component', () => {
  it('Should show', () => {
    const wrapper = shallow(<DashboardShellModule
      title="title"
      isFetching={false}
    ><div>hi</div></DashboardShellModule>)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('Should show loading', () => {
    const wrapper = shallow(<DashboardShellModule
      title="title"
      isFetching
    ><div>hi</div></DashboardShellModule>)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('Should show wire up download buttons', () => {
    const wrapper = shallow(<DashboardShellModule
      title="title"
      isFetching={false}
      onDownloadImage={jest.fn()}
      onDownloadCSV={jest.fn()}
    ><div>hi</div></DashboardShellModule>)


    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('Should should fire download image event', () => {
    const onDownload = jest.fn()
    const wrapper = shallow(<DashboardShellModule
      title="title"
      isFetching={false}
      onDownloadImage={onDownload}
      onDownloadCSV={jest.fn()}
    ><div>hi</div></DashboardShellModule>)

    wrapper.find('a').at(0).simulate('click')
    expect(onDownload).toHaveBeenCalled()
  })

  it('Should should fire download csv event', () => {
    const onDownload = jest.fn()
    const wrapper = shallow(<DashboardShellModule
      title="title"
      isFetching={false}
      onDownloadImage={jest.fn()}
      onDownloadCSV={onDownload}
    ><div>hi</div></DashboardShellModule>)

    wrapper.find('a').at(1).simulate('click')
    expect(onDownload).toHaveBeenCalled()
  })
})
