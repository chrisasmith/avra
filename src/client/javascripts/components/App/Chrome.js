import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { ToastContainer } from 'react-toastify'
import Nav from './Nav'
import styles from './styles/Chrome.scss'

const propTypes = {
  children: PropTypes.element,
  location: PropTypes.object.isRequired,
}

const AppChrome = ({ children, location }) => (
  <div className="fullHeight">
    <div className={styles.chrome}>
      <Nav location={location} />
      <ToastContainer />
      <div className="fullHeight">
        {children}
      </div>
    </div>
  </div>
)

function mapStateToProps(state, ownProps) {
  return { ...state, location: ownProps.location }
}

AppChrome.propTypes = propTypes
export default connect(mapStateToProps)(AppChrome)
