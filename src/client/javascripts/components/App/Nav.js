import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { injectIntl, defineMessages, FormattedMessage } from 'react-intl'
import { routes } from '../../routes'
import styles from './styles/Nav.scss'

const propTypes = {
  location: PropTypes.object.isRequired,
}

const messages = defineMessages({
  searchPlaceholder: {
    id: 'nav_bar.search',
    defaultMessage: 'Search',
  },
})

const Nav = injectIntl(({ intl, location }) => (
  <nav className={classnames(['navbar', styles.navBar])}>
    <a className="navbar-brand" href="#">
      <FormattedMessage
        id="nav_bar.title"
        defaultMessage="AVRA"
      />
    </a>
    <Link className={classnames('nav-link', { [styles.selected]: location.pathname.startsWith(routes.YOURFANS.ROOT) })} to={routes.YOURFANS.ROOT}>
      <FormattedMessage
        id="nav_bar.nav_your_fans"
        defaultMessage="Your Fans"
      />
    </Link>
    <Link className={classnames('nav-link', { [styles.selected]: location.pathname.startsWith(routes.PARTNERS.ROOT) })} to={routes.PARTNERS.ROOT}>
      <FormattedMessage
        id="nav_bar.nav_your_partners"
        defaultMessage="Your Partners"
      />
    </Link>
    <Link className={classnames('nav-link', { [styles.selected]: location.pathname.startsWith(routes.FINDPARTNERS.ROOT) })} to={routes.FINDPARTNERS.ROOT}>
      <FormattedMessage
        id="nav_bar.nav_find_partners"
        defaultMessage="Find Partners"
      />
    </Link>
    <form className="form-inline">
      <input className="form-control form-control-lg" type="search" placeholder={intl.formatMessage(messages.searchPlaceholder)} aria-label="Search" />
    </form>
    <a className="nav-link" href="#">Jane Doe</a>
  </nav>
))

Nav.propTypes = propTypes
export default Nav
