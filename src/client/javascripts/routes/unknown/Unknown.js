import React from 'react'
import { FormattedMessage } from 'react-intl'
import styles from './styles/Unknown.scss'

export default () => (
  <div className={styles.dialog}>
    <h1>
      <FormattedMessage
        id="unknown_page.message"
        defaultMessage="The page you were looking for doesn't exist."
      />
    </h1>
  </div>
)
