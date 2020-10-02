import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import domToImage from 'dom-to-image'
import DashboardShellModule from './DashboardShellModule'
import styles from './styles/DashboardModule.scss'

const propTypes = {
  title: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  value: PropTypes.string,
}

class DashboardStringModule extends Component {
  constructor(props, context) {
    super(props, context)

    this.graph = React.createRef()
    this.onDownloadImage = this.onDownloadImage.bind(this)
  }

  onDownloadImage() {
    domToImage.toJpeg(this.graph.current, { quality: 0.95 })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'nielsen-graph.jpeg'
        link.href = dataUrl
        link.click()
      })
  }

  onExpandClick(e) {
    if (e) e.preventDefault()

    this.setState({ expanded: !this.state.expanded })
  }

  render() {
    const {
      title,
      isFetching,
      value,
    } = this.props


    if (!value || isFetching) {
      return (
        <DashboardShellModule isFetching title={title} />
      )
    }

    return (
      <DashboardShellModule
        isFetching={isFetching}
        title={title}
        onDownloadCSV={this.onDownloadCSV}
        onDownloadImage={this.onDownloadImage}
      >
        <h1 ref={this.graph} className={classnames('mt-3 mb-3 text-center', styles.stringValue)}>
          {value}
        </h1>
      </DashboardShellModule>
    )
  }
}

DashboardStringModule.propTypes = propTypes
export default DashboardStringModule
