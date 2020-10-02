import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Popover, Overlay } from 'react-bootstrap'

const propTypes = {
  target: PropTypes.object,
  show: PropTypes.bool,
  children: PropTypes.element,
  onClickOutside: PropTypes.func.isRequired,
  direction: PropTypes.string,
}

class TooltipPopup extends Component {
  constructor(props, context) {
    super(props, context)

    this.popup = React.createRef()
    this.onGlobalClick = this.onGlobalClick.bind(this)

    this.state = {
      show: true,
    }
  }

  componentWillReceiveProps(next) {
    if (next.show && !this.props.show) {
      // add the global click listener
      document.addEventListener('click', this.onGlobalClick, false)
    }

    if (!next.show && this.props.show) {
      document.removeEventListener('click', this.onGlobalClick, false)
    }
  }

  onGlobalClick(e) {
    // bail if this is a detached element
    // this can happen if we removed the element we clicked on, generally
    // that means we didn't click outside the popup
    if (!document.body.contains(e.target)) {
      return
    }

    // check to see if we contain this click
    const domElement = this.popup.current
    if (domElement && !domElement.contains(e.target) && this.props.show) {
      this.props.onClickOutside()
    }
  }

  render() {
    const { target, show, children, direction } = this.props

    return (
      <div ref={this.popup}>
        <Overlay
          container={this}
          target={target}
          placement={direction || 'bottom'}
          show={show}
        >
          <Popover id={`popover-positioned-${direction || 'bottom'}`}>
            {children}
          </Popover>
        </Overlay>
      </div>
    )
  }
}

TooltipPopup.propTypes = propTypes
export default TooltipPopup
