import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import styles from './styles/SaveFilter.scss'
import TooltipPopup from '../TooltipPopup'

const propTypes = {
  onSave: PropTypes.func.isRequired,
}

class SaveFilter extends Component {
  constructor(props, context) {
    super(props, context)

    this.saveLink = React.createRef()
    this.nameInput = React.createRef()

    this.onButtonClick = this.onButtonClick.bind(this)
    this.onClosePopup = this.onClosePopup.bind(this)
    this.onNameChange = this.onNameChange.bind(this)
    this.onSave = this.onSave.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)

    this.state = {
      showPopup: false,
      name: '',
    }
  }

  onClosePopup(e) {
    if (e) { e.preventDefault() }

    this.setState({ showPopup: false, name: '' })
  }

  onButtonClick(e) {
    if (e) { e.preventDefault() }

    this.setState({ showPopup: true }, () => {
      if (this.nameInput && this.nameInput.current) {
        this.nameInput.current.focus({ preventScroll: true })
      }
    })
  }

  onNameChange(e) {
    this.setState({ name: e.target.value })
  }

  onSave(e) {
    if (e) { e.preventDefault() }

    this.props.onSave(this.state.name)
    this.onClosePopup()
  }

  onKeyDown(e) {
    if (e.keyCode === 13 && this.state.name.length > 0) {
      this.onSave()
    }
  }

  render() {
    return (
      <div className={styles.saveFilter}>
        <div>
          <a ref={this.saveLink} href="#" onClick={this.onButtonClick}>Save segmentation</a>
        </div>
        <TooltipPopup
          target={this.saveLink.current}
          show={this.state.showPopup}
          onClickOutside={this.onClosePopup}
          direction="top"
        >
          <div className={styles.popup}>
            <div className="pb-3"><b>
              <FormattedMessage
                id="save_filter.save_segmentation"
                defaultMessage="Save Segmentation"
              />
            </b></div>
            <div className="form-group">
              <label htmlFor="segmentName">
                <FormattedMessage
                  id="save_filter.name"
                  defaultMessage="Name"
                />
              </label>
              <input
                onChange={this.onNameChange}
                value={this.state.name}
                type="text"
                maxLength="25"
                className="form-control"
                id="segmentName"
                onKeyDown={this.onKeyDown}
                ref={this.nameInput}
              />
            </div>
            <div className="text-center">
              <button onClick={this.onClosePopup} type="button" className="btn btn-secondary btn-sm">
                <FormattedMessage
                  id="save_filter.cancel_btn"
                  defaultMessage="Cancel"
                />
              </button>
              <button
                disabled={this.state.name.length === 0}
                type="button"
                className="btn btn-primary btn-sm ml-3"
                onClick={this.onSave}
              >
                <FormattedMessage
                  id="save_filter.save_btn"
                  defaultMessage="Save"
                />
              </button>
            </div>
          </div>
        </TooltipPopup>
      </div>
    )
  }
}

SaveFilter.propTypes = propTypes
export default SaveFilter
