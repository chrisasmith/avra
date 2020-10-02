import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from './styles/FlyoutButton.scss'
import FlyoutMenu from './FlyoutMenu'

const propTypes = {
  options: PropTypes.array.isRequired,
  onItemSelected: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
}

class FlyoutButton extends Component {
  constructor(props, context) {
    super(props, context)

    this.onButtonClick = this.onButtonClick.bind(this)
    this.onItemSelected = this.onItemSelected.bind(this)

    this.state = {
      flyoutOpen: false,
    }
  }

  onItemSelected(item) {
    this.setState({ flyoutOpen: false })

    if (item) {
      // remove the children
      this.props.onItemSelected({ ...item, children: undefined })
    }
  }

  onButtonClick() {
    this.setState({ flyoutOpen: true })
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.state.flyoutOpen && (
          <FlyoutMenu
            options={this.props.options}
            onItemSelected={this.onItemSelected}
          />
        )}
        <div
          className={classnames('pl-3', styles.flyoutButton, {
            [styles.open]: this.state.flyoutOpen,
            [styles.disabled]: this.props.disabled,
          })}
          onClick={this.onButtonClick}
        >
          <i className={classnames('fa fa-chevron-right', styles.rightArrow)} />
          {this.props.label}
        </div>
      </div>
    )
  }
}

FlyoutButton.propTypes = propTypes
export default FlyoutButton
