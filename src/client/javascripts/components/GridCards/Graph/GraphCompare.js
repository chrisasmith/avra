import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import styles from './styles/GraphCompare.scss'
import { MODULE_TYPE } from '../DashboardGraphModule'

const propTypes = {
  title: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.string.isRequired,
  maxValue: PropTypes.number,
}

const GraphCompare = ({ title, values, type, maxValue }) => (
  <div className={styles.container}>
    <div className={styles.title}>{title}</div>
    <div className={styles.graph}>
      {values.map((value, idx) => {
        const percent = type === MODULE_TYPE.PERCENT || !maxValue ? value : (value * 100) / maxValue
        return (
          <div className={styles.lineContainer} key={idx}>
            <div>
              <div className={styles.graphWrapper}>
                <div
                  style={{ width: `${percent}%` }}
                  className={classnames(styles.graphLine, { [styles.first]: idx === 0 })}
                />
              </div>
              <div
                className={classnames(styles.graphAmount, { [styles.first]: idx === 0 })}
              >
                {value}{type === MODULE_TYPE.PERCENT ? '%' : ''}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  </div>
)

GraphCompare.propTypes = propTypes
export default GraphCompare
