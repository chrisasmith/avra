import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import styles from './styles/IndexGraph.scss'

const propTypes = {
  title: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
  value: PropTypes.number,
  maxValue: PropTypes.number,
}

class IndexGraph extends Component {
  constructor(props, context) {
    super(props, context)

    this.line = React.createRef()

    this.state = {
      expanded: false,
    }
  }

  render() {
    const { title, tooltip, value, maxValue } = this.props

    const percent = !maxValue ? value : (value * 100) / maxValue
    const midWay = 100 / maxValue

    return (
      <div className={styles.container}>
        <ReactTooltip type="info" />
        <div className={styles.title}>{title}</div>
        <div className={styles.graph}>
          <div className={styles.lineContainer}>
            <div>
              <div className={styles.graphWrapper} data-tip={tooltip} ref={this.line}>
                <div
                  style={{ width: `${percent}%` }}
                  className={classnames(styles.graphLine)}
                />
                <div
                  style={{ width: `${percent}%`, maxWidth: `${midWay}%` }}
                  className={classnames(styles.graphLine, styles.first)}
                />
                <div
                  className={classnames(styles.graphAmount, styles.first)}
                >
                  {value.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

IndexGraph.propTypes = propTypes
export default IndexGraph
