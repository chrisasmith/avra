import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import styles from './styles/DashboardModule.scss'
import TooltipPopup from '../TooltipPopup'

const propTypes = {
  title: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  children: PropTypes.element,

  onDownloadImage: PropTypes.func,
  onDownloadCSV: PropTypes.func,
}

class DashboardShellModule extends Component {
  constructor(props, context) {
    super(props, context)

    this.downloadButton = React.createRef()
    this.popup = React.createRef()

    this.onDownloadImage = this.onDownloadImage.bind(this)
    this.onDownloadClick = this.onDownloadClick.bind(this)
    this.closePopup = this.closePopup.bind(this)
    this.onDownloadCSV = this.onDownloadCSV.bind(this)

    this.state = {
      popupTarget: null,
      showDownloadPopup: false,
    }
  }

  openPopup() {
    this.setState({ showDownloadPopup: true })
  }

  closePopup() {
    this.setState({ showDownloadPopup: false })
  }

  onDownloadClick(e) {
    this.setState({ popupTarget: e.target }, () => {
      this.openPopup()
    })
  }

  onDownloadImage(e) {
    if (e) e.preventDefault()

    this.props.onDownloadImage()
    this.closePopup()
  }

  onDownloadCSV(e) {
    if (e) e.preventDefault()

    this.props.onDownloadCSV()
    this.closePopup()
  }

  render() {
    const {
      title,
      isFetching,
      children,
      onDownloadCSV,
      onDownloadImage,
    } = this.props


    if (isFetching) {
      return (
        <div className={styles.module}>
          <div className="container">
            <div>Loading...</div>
          </div>
        </div>
      )
    }

    return (
      <div className={styles.module}>
        <div className="container">
          <div
            href="#"
            className={styles.download}
            onClick={this.onDownloadClick}
          >
            <i className="fa fa-download" aria-hidden="true" />
          </div>
          <TooltipPopup
            target={this.state.popupTarget}
            show={this.state.showDownloadPopup}
            onClickOutside={this.closePopup}
          >
            <div className={styles.popup}>
              {onDownloadImage && (
                <a href="#" onClick={this.onDownloadImage}>Download .jpg</a>
              )}
              {onDownloadCSV && (
                <a href="#" onClick={this.onDownloadCSV}>Download csv</a>
              )}
            </div>
          </TooltipPopup>
          <h6 className={classnames('text-center pt-3 pb-2', styles.title)}>{title}</h6>
          {children}
        </div>
      </div>
    )
  }
}

DashboardShellModule.propTypes = propTypes
export default DashboardShellModule
