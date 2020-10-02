import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Button } from 'react-bootstrap'
import styles from './styles/FilterButton.scss'

const propTypes = {
  value: PropTypes.number,
  values: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  name: PropTypes.string.isRequired,
}

class FilterButton extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      show: true,
    }
  }

  render() {
    return (
      <Button
        className={classnames('btn-outline-primary', styles.button)}
        active={this.props.values.includes(this.props.value)}
        onClick={() => this.props.onChange(this.props.name, this.props.value)}
      >
        {this.props.children}
      </Button>
    )
  }
}

FilterButton.propTypes = propTypes
export default FilterButton
