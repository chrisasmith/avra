import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { FormattedMessage } from 'react-intl'
import { routes } from '../../../routes'

const propTypes = {
  location: PropTypes.object.isRequired,
}

const Tabs = ({ location }) => (
  <ul className="nav nav-tabs">
    <li className="nav-item">
      <Link
        className={classnames('nav-link', { active: location.pathname === routes.YOURFANS.ROOT })}
        to={routes.YOURFANS.ROOT}
      >
        <FormattedMessage
          id="your_fans.tabs.overview"
          defaultMessage="Overview"
        />
      </Link>
    </li>
    <li className="nav-item">
      <Link
        className={classnames('nav-link', { active: location.pathname.startsWith(routes.YOURFANS.INTEREST_PROFILE) })}
        to={routes.YOURFANS.INTEREST_PROFILE}
      >
        <FormattedMessage
          id="your_fans.tabs.interest"
          defaultMessage="Interest Profile"
        />
      </Link>
    </li>
    <li className="nav-item">
      <Link
        className={classnames('nav-link', { active: location.pathname.startsWith(routes.YOURFANS.MEDIA_PROFILE) })}
        to={routes.YOURFANS.MEDIA_PROFILE}
      >
        <FormattedMessage
          id="your_fans.tabs.media"
          defaultMessage="Media Profile"
        />
      </Link>
    </li>
    <li className="nav-item">
      <Link
        className={classnames('nav-link', { active: location.pathname.startsWith(routes.YOURFANS.SOCIAL_MEDIA) })}
        to={routes.YOURFANS.SOCIAL_MEDIA}
      >
        <FormattedMessage
          id="your_fans.tabs.social"
          defaultMessage="Social Media"
        />
      </Link>
    </li>
    <li className="nav-item">
      <Link
        className={classnames('nav-link', { active: location.pathname.startsWith(routes.YOURFANS.SEGMENTATION) })}
        to={routes.YOURFANS.SEGMENTATION}
      >
        <FormattedMessage
          id="your_fans.tabs.segment"
          defaultMessage="Segmentation"
        />
      </Link>
    </li>
    <li className="nav-item">
      <Link
        className={classnames('nav-link', { active: location.pathname.startsWith(routes.YOURFANS.TRENDS) })}
        to={routes.YOURFANS.TRENDS}
      >
        <FormattedMessage
          id="your_fans.tabs.trends"
          defaultMessage="Trends"
        />
      </Link>
    </li>
  </ul>
)

Tabs.propTypes = propTypes
export default Tabs
